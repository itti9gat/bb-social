import { useState } from "react";
import Preloading from "./preloading";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Cover({url, editable, fetchData}) {
    const [isUploading,setIsUploading] = useState(false)
    const supabase = useSupabaseClient()
    const session = useSession()

    async function updateBannerProfile(url) {
        await supabase.from('profiles')
            .update({
              banner : url,
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

    async function addPhotoBanner(ev) {
        const files = ev.target.files;
    
        if (files.length > 0) {
            setIsUploading(true)
    
            for (const file of files) {
                const newName = Date.now() + file.name;
                const result = await supabase.storage.from('banners')
                .upload(newName, file)
                .then(result => {
                    if (result.data) {
                        const url = process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/banners/' + result.data.path
                        updateBannerProfile(url)
                    }
                })
            }
    
            setIsUploading(false)
        }
      }

      
  return (
      <div className="h-36 overflow-hidden relative">
        <img src={url} />
        { isUploading && (
            <div className="absolute inset-0 flex items-center bg-white opacity-70">
            <div className="mx-auto">
                <Preloading />
            </div>
            </div>
        )}
        { editable && (
            <label className="absolute bottom-2 right-2">
                <div className="flex bg-white rounded-lg py-1 px-3 items-center shadow-md shadow-gray-400 cursor-pointer gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
                <span className="">Change Banner</span>
                <input type="file" className="hidden" onChange={addPhotoBanner} />
                </div>
            </label>
        )}
      </div>
  )
}
