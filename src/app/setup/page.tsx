import { CreateServerModal } from "@/components/modals/create-server";
import { initialProfile } from "@/lib/data/initial-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SetupPage = async () => {
    const profile = await initialProfile();

    if(!profile) return <RedirectToSignIn/>

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if(server) {
        return redirect(`/servers/${server.id}`);
    }

    return <CreateServerModal/>
}

export default SetupPage;