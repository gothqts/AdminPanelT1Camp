import { useEffect, useState } from 'react'

const useHandleResize = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);

    const handleResize = (e )=>{
        setWidth(e.target.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])
    return width
}

export default useHandleResize