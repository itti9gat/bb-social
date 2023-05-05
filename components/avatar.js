import { useState } from "react";
import Preloading from "./preloading";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Avatar({url,size,editable,fetchData}) {

  const [isUploading,setIsUploading] = useState(false)
  const supabase = useSupabaseClient()
  const session = useSession();

  let width = 'w-12 h-12';
  if (size === 'lg') {
    width = 'w-24 h-24';
  }

  async function updateImageProfile(url) {
    await supabase.from('profiles')
        .update({
          avatar : url,
     })
    .eq('id', session.user.id)
    .then(result => {
        if (result.error) {
            throw result.error;
        }

        if (fetchData) {
            fetchData()
        }
    });
  }

  async function addPhotoProfile(ev) {
    const files = ev.target.files;

    if (files.length > 0) {
        setIsUploading(true)

        for (const file of files) {
            const newName = Date.now() + file.name;
            const result = await supabase.storage.from('profiles')
            .upload(newName, file)
            .then(result => {
                if (result.data) {
                    const url = process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/profiles/' + result.data.path
                    updateImageProfile(url)
                }
            })
        }

        setIsUploading(false)
    }
  }

  return (
    <div className={`${width} relative`}>
        <div className={`${width} flex rounded-full overflow-hidden shadow-md`}>
            <img src={url} referrerPolicy="no-referrer" />
        </div>
        { isUploading && (
            <div className="absolute inset-0 flex items-center bg-white opacity-70 rounded-full">
                <div className="mx-auto">
                    <Preloading />
                </div>
            </div>
        )}
        { editable && (
            <div className="absolute bottom-0 -right-1 bg-gray-50 rounded-full p-1 shadow-lg hander">
                <label className="bg-red-300 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                    <input type="file" className="hidden" onChange={addPhotoProfile} />
                </label>
            </div>
        )}
    </div>
  )
}
