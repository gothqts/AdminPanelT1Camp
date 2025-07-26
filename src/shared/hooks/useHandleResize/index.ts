import { useEffect, useState } from 'react'

const useHandleResize = (): number => {
    const [width, setWidth] = useState<number>(window.innerWidth);

    const handleResize = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return width;
}

export default useHandleResize;