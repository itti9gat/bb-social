import Card from "@/components/card";
import { UserContext } from "@/contexts/UserContext";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function LeftBar() {
    const linkActive = 'flex gap-3 py-3 px-5 font-normal bg-blue-500 text-white -mx-5 px-5 rounded-md shadow-md'
    const linkNonActive = 'flex text-blue-500 gap-3 py-2 hover:bg-blue-100 rounded-md my-2 -mx-5 px-5'

    const {pathname, push} = useRouter()

    const supabase = useSupabaseClient();
    const logoutWithGoogle = async () => {
        await supabase.auth.signOut();
        push('/');
    }
    
    const {profile:myProfile} = useContext(UserContext)

    return (
        <>
        <Card>
        <h2 className="py-3 px-2 font-semibold">Navigation</h2>
        <Link href="/" className={ pathname === "/" ? linkActive : linkNonActive}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Home
        </Link>
        <Link href={`/profile/${myProfile?.id}`} className={ pathname.indexOf("profile") > 0 ? linkActive : linkNonActive}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            Profile
        </Link>
        <button onClick={logoutWithGoogle} className="w-full">
            <span className={linkNonActive}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Logout
            </span>
        </button>
        </Card>
        <Card>
            <div>
            <img className="-mt-3" src="https://blogger.googleusercontent.com/img/a/AVvXsEjO0pinCN8SoAcCG9aD6yt4u1Q3hfqx5x-92ANuKkZycLoLP157vS8sNiLJkB4-f2vohOP8vp9Z8ZkG2cAOcrvFzoWvy1rdxXr2zw7Cur1QgFiLboIZAaehcWgex3oUm2veYeP_WGKnrPxGhw-JunK_jFcsV7KiWMhBxC96LK17RgBBOALWu2EDBYKk" />
            <img className="-mt-9" src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-ar21.png" />
            <img className="pt-3 h-14 mb-10 mx-auto" src="https://raw.githubusercontent.com/supabase/supabase/master/packages/common/assets/images/supabase-logo-wordmark--light.svg" />
            </div>
        </Card>
        </>
    )
}
