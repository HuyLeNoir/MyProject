import NavItem from "./navItem";
export default function NavigationBar(){
    return(
        <div className='flex gap-0 NavBar'>
            <NavItem navigateToTarget="/detai" fieldName="Danh sách đề tài NCKH"></NavItem>
            <NavItem navigateToTarget="/baibao" fieldName="Danh sách bài báo"></NavItem>
            <NavItem navigateToTarget="/chuyende" fieldName="Danh sách chuyên đề"></NavItem>
            <NavItem navigateToTarget="/duan" fieldName="Danh sách dự án"></NavItem>
            <NavItem navigateToTarget="/giangvien" fieldName="Danh sách giảng viên"></NavItem>
        </div>
    );
}