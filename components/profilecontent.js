import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import ViewZone from "./viewzone";
import Card from "./card";

export default function ProfileContent({active, posts, myProfile}) {
  
  return (
    <>
    {active === "posts" && posts.map(post => (
        <ViewZone key={post.created_at} {...post} myProfile={myProfile} />
    ))}

    {active === "photos" && (
        <Card>
            <div className="flex gap-3 flex-wrap">
            { posts.map((post, i) => (
                <div key={`post+${i}`}>
                    { post.photos.map((photo,i) => (
                        <img key={`img+${i}`} src={photo} className="mb-3 rounded-lg w-auto h-60" />
                    ))}
                </div>
            ))}
            </div>

        </Card>
    )}
        
    </>
  );
}