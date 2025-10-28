export default function AvatarColumn({MSCB, email, name}){
    return (
        <div className="flex gap-5">
            <div className="avatarWrapper aspect-square w-12 rounded-full overflow-hidden">
                <img className="w-full h-full object-cover" src={`/${MSCB}.jpg`} alt="GiangVienAvatar" />
            </div>
            <div className="Name flex flex-col">
                <p className="text-textColor1 text-h6">{name}</p>
                <p className="text-small text-textColor2">{email}</p>
            </div>
        </div>
    );
}