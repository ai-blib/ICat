// @ts-ignore
import  Load from '@/public/assets/three-dots.svg';

interface Props {
    loading: Boolean
}

export const TextLoading = ({loading}: Props) => {
    return <>{loading ? <img height={10} src={Load} alt=""/> : ""}</>
}