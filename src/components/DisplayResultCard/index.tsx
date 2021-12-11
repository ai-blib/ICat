import {memo} from "react";
import {Card,Gap} from '../';
import {Button, ImageA, ImageB, Inner, Small, Wrap} from './styles';

interface Props {
    info: any
};
export const DisplayResultCard = memo(({info}: Props) => {
    const {from, to,fromSymbol,toSymbol,currentLpAmount,LpPer} = info
    return (
        <Card borderColor={"#3D52F4"}>
            <Inner>
                <div className='cardColumn'>
                    <Button>
                        <Wrap>

                            {from && <ImageA src={from}/>}
                            {to && <ImageB src={to}/>}
                        </Wrap> <span className='text'>{fromSymbol}-{toSymbol}</span>
                    </Button>
                    <span className='amount'>{currentLpAmount}</span>
                </div>
                <div className='cardColumn'>
                    <p className='text'>
                        <span className='textBalance'>Share of pool:</span>
                    </p>
                    <Small>
                        {LpPer}%
                    </Small>
                </div>
            </Inner>
        </Card>
    )
});
