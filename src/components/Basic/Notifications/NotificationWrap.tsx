import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import NotificationCard from "./Notification.Card";
import { getVW } from "../../styles";
import {useMessage} from '@/usehooks/useNotification'
const Wrap = styled.div`
  position: fixed;
  width:auto ;
  height:auto ;
  top: 140px;
  right: 60px;
  overflow: hidden;
  z-index: 999;
`;

export const NotificationWrap = () => {
  const dom = useRef<HTMLDivElement>(null);
  const {notifications} =useMessage();
  console.log(notifications,90);

  useEffect(() => {
    dom.current?.scrollTo(0, dom.current.clientHeight);
  });
  return (
    <Wrap>
      {(notifications as any[]||[]).map((i, index) => (
        <NotificationCard key={index} {...i} />
      ))}
    </Wrap>
  );
};

