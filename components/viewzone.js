import Avatar from "@/components/avatar";
import Card from "@/components/card";
import { useEffect, useState } from "react";
import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function ViewZone({id, content, author, photos, created_at, profiles:postProfile, myProfile}) {

    const supabase = useSupabaseClient()

    const [comment,setComment] = useState("")
    const [viewLove, setViewLove] = useState([])
    const [viewComment,setViewComment] = useState([])

    const fetchComment = () => {
        supabase.from("comment")
        .select('id, comment, created_at, profiles(id, name, avatar)')
        .eq('post_id', id)
        .order('created_at',{ascending: true})
        .then(res => {
          if (res?.data?.length) {
            setViewComment(res.data);
          }
        })
    }

    const fetchLovePost = () => {
        supabase.from("lovepost")
        .select()
        .eq('post_id', id)
        .then(res => {
            setViewLove(res.data);
        })
    }

    const createComment = () => {
        if (content !== "") {
            supabase.from("comment").insert({
                post_id : id,
                user_id : myProfile.id,
                comment,
            }).then(response => {
                if (!response.error) {
                    setComment("")
                    fetchComment()
                }
            })
        }
    }

    const isLikedByMe = !!viewLove.find(like => like.user_id === myProfile?.id);

    const toggleLove = () => {
        if (isLikedByMe) {
        supabase.from('lovepost').delete()
            .eq('post_id', id)
            .eq('user_id', myProfile.id)
            .then(() => {
                fetchLovePost()
            });
            return;
        }

        supabase.from("lovepost").insert({
            post_id : id,
            user_id : myProfile.id,
        }).then(response => {
            if (!response.error) {
                fetchLovePost()
            }
        })
    }

    useEffect(() => {
        fetchComment()
        fetchLovePost()
    },[postProfile?.avatar,postProfile?.name])


    return (
        <Card>
            <div>
              <div className="flex gap-3">
                <Link className="cursor-pointer" href={`/profile/${author}`}><Avatar url={postProfile?.avatar} /></Link>
                <div>
                  <div className="flex gap-2">
                  <div><Link className="hover:underline cursor-pointer font-semibold" href={`/profile/${author}`}>{postProfile?.name}</Link></div>
                  <div>shared a post</div>
                </div>
                <div className="text-sm text-gray-400"><ReactTimeAgo date={ new Date(created_at).getTime() } /></div>
                </div>
              </div>
            </div>
            <div className="py-3">{content}</div>
            { photos?.length > 0 && (
              <div className="flex gap-2">
              { photos.map((photo, i) => (
                <div key={i}>
                  <img src={photo} alt="" className="rounded-md overflow-hidden w-auto h-60"  />
              </div>
              ))}
              </div>
            )}
            <div className="flex pt-4 gap-5">
                <div className="flex gap-1">
                    { isLikedByMe && (
                        <span className="text-red-600 hover:cursor-pointer" onClick={toggleLove}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                        </span>
                    )}

                    { !isLikedByMe && (
                        <span className="hover:cursor-pointer" onClick={toggleLove}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        </span>
                    )}
                    
                    <span>{ viewLove?.length }</span>
                </div>
                <div className="flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                    <span>{viewComment?.length}</span>
                </div>
            </div>
            { (viewComment?.length) > 0 && (
                <div className="mt-4">
                    {viewComment.map((v,i) => (
                        <div className="flex items-center gap-2 py-3" key={i}>
                            <Avatar url={v?.profiles?.avatar} />
                            <div className="bg-gray-200 p-2 px-4 rounded-3xl">
                                <div className="flex gap-2 items-center">
                                <Link href={`/profile/${v?.profiles?.id}`} className="font-semibold hover:underline">{v?.profiles?.name}</Link>
                                    <ReactTimeAgo className="text-sm text-gray-400" date={ (new Date(v.created_at)).getTime() } />
                                </div>
                                
                                <div>
                                {v?.comment}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="flex gap-2 py-5">
              <Avatar url={myProfile?.avatar} />
              <textarea value={comment} onChange={e => setComment(e.target.value)}  className="grow p-2 border-gray-100 border-2 rounded-xl" placeholder="Write a comment ..." />
            </div>
            <div className="flex justify-between">
                <div className="flex gap-2">
                </div>
                <button onClick={createComment} className="bg-blue-500 px-3 py-1 text-white rounded-md">Comment</button>
            </div>
        </Card>
    )
}
