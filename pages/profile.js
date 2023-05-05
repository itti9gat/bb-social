import Avatar from "@/components/avatar";
import Card from "@/components/card";
import Cover from "@/components/cover";
import Layout from "@/components/layout";
import NameBar from "@/components/namebar";
import ProfileContent from "@/components/profilecontent";
import ProfileTabs from "@/components/profiletab";
import { UserContextProvider } from "@/contexts/UserContext";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProfilePage() {

    const supabase = useSupabaseClient()
    const session = useSession()

    const [profile, setProfile] = useState(null)
    const [posts, setPosts] = useState([])
    const [myProfile, setMyProfile] = useState(null)
    
    const router = useRouter()
    const userId = router?.query?.id;
    const tab = router?.query?.tab?.[0] || 'posts';

    const fetchPost = async () => {
        await supabase.from("posts")
        .select('id, content, author, photos, created_at, profiles(id, name, avatar)')
        .eq('author', userId)
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
    
    const fetchUser =  async () => {
        await supabase.from('profiles')
          .select()
          .eq('id', userId)
          .then(result => {
            setProfile(result.data?.[0])
          });
    }

    const fetchData = () => {
        fetchPost()
        fetchUser()
        fetchMyUser()
    }

    useEffect(() => {
        if (!userId) {
            return 
        }

        fetchData()
    },[userId])

    const isMyUser = userId === session?.user?.id;

    return (
        <UserContextProvider>
            <Layout>
                <Card noPadding={true}>
                <div className="relative rounded-md overflow-hidden">
                    <Cover editable={isMyUser} fetchData={fetchData} url={profile?.banner} />
                    <div className="absolute top-24 left-4 z-20">
                        <Avatar size={'lg'} url={profile?.avatar} editable={isMyUser} fetchData={fetchData} />
                    </div>
                    <NameBar profile={profile} editable={isMyUser} fetchData={fetchData} />
                    <ProfileTabs userId={userId} active={tab} />
                </div>
                </Card>
                <ProfileContent userId={userId} active={tab} posts={posts} myProfile={myProfile} />
            </Layout>
        </UserContextProvider>
    );
  }