import Dropdown from './Dropdown'
export default function Pagination({numberOfRows, numberOfPage, selected, setSelected, setCurrentPage}){
    const NoPage = ["5", "10", "15"];
    return (
        <div className=' w-full grid grid-cols-3 items-center'>
            <span className=''>Tổng số đề tài: {numberOfRows}</span>
            <div className='flex gap-2.5 items-center justify-self-center'>
                {Array.from({ length: numberOfPage }, (_, i) => (
                    <span key={i} onClick={()=>{setCurrentPage(i)}}  className='pageButton'>
                    {i + 1}
                    </span>
                ))}
            </div>
            <Dropdown selected={selected} setSelected={setSelected} className="justify-self-end" size="auto" fieldName="Số đề tài" options={NoPage}></Dropdown>
        </div>
    );
}