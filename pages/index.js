import Layout from "@/components/layout";
import PostZone from "@/components/postzone";
import Login from "@/components/login";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import ViewZone from "@/components/viewzone";
import { useEffect, useState } from "react";
import {UserContextProvider} from "../contexts/UserContext";

export default function Home() {

    const session = useSession();
    const supabase = useSupabaseClient();
    const [posts, setPosts] = useState([]);
    const [myProfile, setMyProfile] = useState(null);

    const fetchPost = async () => {
        await supabase.from("posts")
        .select('id, content, author, photos, created_at, profiles(id, name, avatar)')
        .order('created_at',{ascending: false})
        .then(res => {
        if (res?.data?.length) {
            setPosts(res.data);
        }
        })
    }

    const fetchMyUser =  async () => {
        await supabase.from('profiles')
        .select()
        .eq('id', session?.user?.id)
        .then(result => {
            setMyProfile(result.data?.[0])
        });
    }

    useEffect(() => {
        if (!session?.user.id) {
            return
        }

        fetchPost()
        fetchMyUser()
    },[session?.user?.id])

    if (!session) {
        return <Login />
    }

    return (
        <UserContextProvider>
        <Layout>
            <PostZone onPost={fetchPost} />
                {posts.map(post => (
            <ViewZone key={post.created_at} {...post} myProfile={myProfile} />
            ))}
        </Layout>
        </UserContextProvider>
    )
}
