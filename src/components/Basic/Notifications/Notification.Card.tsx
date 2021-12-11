import classNames from "classnames";
import {useEffect, useMemo, useRef, useState} from "react";
import styled from "styled-components";
import {Notification} from "@/types/global";
import Icon from "@/icons/Icon";
import {getVW} from "../../styles";

const Card = styled.div<{ type: string }>`
  display: flex;
  align-items: flex-start;
  width: 326px;
  min-height: 108px;
  border-radius: 20px;
  background-color: #1E1E1E;
  transition: all 0.5s;
  animation: slideIn 120ms ease-out forwards;
  opacity: 0;
  padding: 18px;
  transform: translate(100%, 0);
  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: translate(100%, 0);
    }
    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }
  &.out {
      animation: slideOut1 120ms ease-out forwards,
      slideOut2 120ms ease-out 240ms forwards,
      slideOut3 120ms ease-out 360ms forwards;
      width: 0;
      height: 0;
  }
  @keyframes slideOut1 {
    0% {
      opacity: 1;
      transform: translate(0, 0);
    }
    100% {
      opacity: 1;
      transform: translate(0, ${getVW(-4)});
    }
  }
  @keyframes slideOut2 {
    0% {
      opacity: 1;
      transform: translate(0, ${getVW(-4)});
    }
    100% {
      opacity: 0;
      transform: translate(100%, ${getVW(-4)});
    }
  }
  @keyframes slideOut3 {
    0% {
      height: ${getVW(-121)};
      margin-bottom: ${getVW(20)};
    }
    100% {
      height: 0;
      margin-bottom: 0;
    }
  }
  .text{
    width: 100%;
    min-height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
      .title{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .titleInner{
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
        }
      }
      .link{
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;
        color: #3D52F4;
        cursor: pointer;
        text-decoration: underline;
        margin-left: 46px;
      }
  }
  
  & svg {
    width: ${getVW(31)};
    height: ${getVW(31)};
    margin-right: ${getVW(20)};
  }
  & .title label {
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    color: #F6FCFD;
    width: 237px;
  }
  & .title span {
    font-size: ${getVW(14)};
    font-family: "Nunito Sans";
    color: #fff;
    opacity: 0.6;
  }
  & .content {
    font-size: ${getVW(18)};
    font-family: "Nunito Sans";
    color: #fff;
    padding-top: ${getVW(6)};
  }
`;
const Content =styled.div`
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    width: 243px;
    color: #888E8F;
`
interface Props extends Notification {
}

const NotificationCard = ({type,title,content}: Props) => {
    const [out, setOut] = useState(false);
    const dom = useRef<HTMLDivElement>(null);

    const icon = useMemo(() => {
        switch (type) {
            case "success":
                return "success";
            case "error":
                return "error";
            default:
                return "success";
        }
    }, [type]);
    const label = useMemo(() => {
        switch (type) {
            case "success":
                return "Succeed";
            case "error":
                return "Fail";
            default:
                return "";
        }
    }, [type]);
    const close = ()=>{
        setOut(true);
        // @ts-ignore
        // deleteMessage(props.id);
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            if (dom.current) setOut(true);
            setTimeout(() => {
                dom.current?.remove();
                // @ts-ignore
                // deleteMessage(props.id);
            }, 880);
        }, 4 * 1000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <Card
            ref={dom}
            className={classNames({out})}
            type={type}
            onClick={close}
        >
            {/*<Icon name={icon} />*/}
            <div className="text">
                <div className="title">
                    <div className='titleInner'>
                         <Icon name={icon} />
                        <label>{title}</label>
                    </div>
                    <span onClick={close}>
                        <Icon  name='close'/>
                    </span>

                </div>
                <Content>
                    {content}
                </Content>
                <a className='link'> View on explorer</a>
            </div>
        </Card>
    );
};

export default NotificationCard;
