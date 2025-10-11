import { useNavigate } from 'react-router-dom';
export default function NavItem({navigateToTarget, fieldName}){
    const navigate = useNavigate();
    return(
        <button onClick={() => navigate(navigateToTarget)} className='my-2.5 group transition-all duration-300 naviButton relative'>
                <span className='z-1 relative'>{fieldName}</span>
                <span className=' rounded-md absolute w-full h-1 bg-primaryColor origin-bottom left-0 bottom-0 transition-all duration-300 scale-x-0 group-hover:scale-x-100 group-hover:text-white z-0'></span>
        </button>
    );
    
}