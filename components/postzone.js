import Avatar from "@/components/avatar";
import Card from "@/components/card";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Preloading from "@/components/preloading";

export default function PostZone({onPost}) {
    const [profile, setProfile] = useState(null);
    const [content, setContent] = useState("");
    const [uploadFile, setUploadFile] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    const supabase = useSupabaseClient();
    const session = useSession();
    
    useEffect(() => {
        supabase.from("profiles")
        .select()
        .eq('id', session.user.id)
        .then(result => {
            if (result.data.length) {
                setProfile(result.data[0]);
            }
        })
    }, []);

    const createPost = () => {
        if (content !== "") {
            supabase.from("posts").insert({
                author : session.user.id,
                content,
                photos : uploadFile,
            }).then(response => {
                if (!response.error) {
                    setContent("")
                    setUploadFile([])
                    if (onPost) {
                        onPost();
                    }
                }
            })
        }
    }

    const addPhoto = async (ev) => {
        const files = ev.target.files;

        if (files.length > 0) {
            setIsUploading(true)

            for (const file of files) {
                const newName = Date.now() + file.name;
                const result = await supabase.storage.from('photos')
                .upload(newName, file)
                .then(result => {
                    if (result.data) {
                        const url = process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/photos/' + result.data.path
                        setUploadFile(prevUploadFile => [...prevUploadFile, url])
                    }
                })
            }

            setIsUploading(false)
        }
    }

    return (
        <Card>
            <div className="flex gap-2">
              <Avatar url={profile?.avatar} />
              <textarea value={content} onChange={e => setContent(e.target.value)} className="grow p-2 border-gray-100 border-2 rounded-xl" placeholder={`What's on your mind ? ${profile?.name}`} />
            </div>
            { isUploading && (
                <Preloading />
            )}
            { uploadFile.length > 0 && (
                <div className="flex gap-2 py-3" >
                    {uploadFile.map((upload, i) => (
                        <div key={i}>
                            <img className="w-auto h-24 rounded-md" src={upload} alt="" />
                        </div>
                    ))}
                </div>
            )}
            <div className="flex justify-between py-3">
                <label className="flex gap-1 items-center px-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    Photos
                    <input type="file" multiple className="hidden" onChange={addPhoto} />
                </label>
                <button onClick={createPost} className="bg-blue-500 px-5 py-1 text-white rounded-md">Share</button>
            </div>
        </Card>
    )
}
