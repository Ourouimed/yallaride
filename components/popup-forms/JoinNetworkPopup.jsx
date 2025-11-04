import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { usePopup } from "@/context/PopupContext";
import { useNetwork } from "@/context/NetworksContext";
import { Button } from "../ui/button";

export default function JoinNetworkPopup(){
    const { closePopup } = usePopup()
    const { isLoading , joinNetwork } = useNetwork()
    const [inviteCode , setInviteCode] = useState('')

    const handleJoinNetwork = async ()=>{
        await joinNetwork(inviteCode.trim())
        closePopup()
    }
    return <div className="space-y-4">
        <div className="text-center">
            <h3 className="text-xl font-semibold">Join private network</h3>
            <p className="text-gray-500 text-sm">
                Join a private network and share rides with your freinds
            </p>
        </div>
        <div className="space-y-2">
            <Label htmlFor='invite-code'>invite code</Label>
            <Input id="invite-code" type="text" placeholder="invite code" value={inviteCode} onChange={e=>{
                setInviteCode(e.target.value)
            }} />
        </div>
        <div className="flex justify-end gap-4">
            <Button onClick={closePopup} variant='outline'>Cancel</Button>
            <Button onClick={handleJoinNetwork} disabled={isLoading}>{isLoading ? 'Joining...' : 'Join network'}</Button>
        </div>
    </div>
}