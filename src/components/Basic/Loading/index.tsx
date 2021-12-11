// @ts-ignore
import  Load from '@/public/assets/bars.svg';

interface Props {
    loading: Boolean
}

export const Loading = ({loading}: Props) => {
    return <>{loading ? <img width={65} src={Load} alt=""/> : ""}</>
}