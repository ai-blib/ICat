import styled from "styled-components";

// export const getVW = (val: number): string =>
//   window.innerWidth < 1920 ? `${(val * 100) / 1920}vw` : `${val}px`;

export const getVW = (val: number): string => `${(val * 100) / 1920}vw`;
export const getVH = (val: number): string => `${(val * 100) / 1080}vh`;

export const mVW = (val: number): string => `${(val * 100) / 375}vw`;
export const mVH = (val: number): string => `${(val * 100) / 812}vh`;

export const getScaled = (originX: number, originY: number, x: number) =>
  (x * originY) / originX;

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
};

export const Fixed = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ScrollBar = styled.div`
  &::-webkit-scrollbar {
    width: ${getVW(6)};
    background-color: #333143;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: ${getVW(6)};
    background-color: #483c50;
  }
`;

export const ImgWrap = styled.div`
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

export const Modal = styled.div`
  position: fixed;
  display: none;
  top: 0;
  bottom: 0;
  left: ${getVW(266)};
  right: 0;
  pointer-events: none;
  &.ac {
    display: block;
    pointer-events: all;
    z-index: 100;
  }
  & .bg {
    width: calc(100% + ${getVW(266)});
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 180ms ease;
    margin-left: ${getVW(-266)};
  }
  &.ac .bg {
    opacity: 1;
  }
  & .scrollwrap {
    position: absolute;
    top: 50%;
    left: calc(50% + ${getVW(16)});
    transform: translate(-50%, -50%);
    width: ${getVW(676)};
    max-height: calc(100vh - ${getVW(10)});
    overflow-x: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: ${getVW(6)};
    }
    &::-webkit-scrollbar-thumb {
      background-color: #333143;
      border-radius: ${getVW(6)};
    }
  }
  & .wrap {
    width: ${getVW(660)};
    border-radius: ${getVW(30)};
    background-image: linear-gradient(170deg, #3e2b50, #2f2d3b);
    box-shadow: 0 ${getVW(3)} ${getVW(20)} rgba(0, 0, 0, 0.3);
    padding: ${getVW(25)} ${getVW(70)} ${getVW(60)} ${getVW(70)};
    opacity: 0;
  }
  &.ac .wrap {
    opacity: 1;
  }
  & .wrap button.close {
    position: absolute;
    width: ${getVW(25)};
    height: ${getVW(25)};
    top: ${getVW(30)};
    right: ${getVW(30)};
    background-color: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 120ms ease;
    color: #f5f5f5;
  }
  & .wrap button.close:hover {
    opacity: 1;
  }
  & .wrap label.label {
    display: block;
    font-size: ${getVW(32)};
    font-family: "Roboto bold";
    margin-left: ${getVW(-20)};
    color: #f5f5f5;
  }
  & .wrap label.sub-label {
    display: block;
    font-size: ${getVW(18)};
    font-family: "Roboto bold";
    margin-top: ${getVW(35)};
    margin-bottom: ${getVW(10)};
    padding: 0;
    color: #f5f5f5;
  }
  & .wrap input {
    width: 100%;
    height: ${getVW(58)};
    border: ${getVW(2)} solid #685476;
    border-radius: ${getVW(10)};
    background-color: #3d304b;
    font-size: ${getVW(24)};
    font-family: "Roboto medium";
    padding: 0 ${getVW(20)};
    color: #f5f5f5;
  }
  & .wrap input::placeholder {
    color: #f5f5f5;
    opacity: 0.3;
  }
  & .wrap input.err {
    background-color: #4b303e;
    border-color: #a8468a;
  }
  & .wrap .balance-ctrl {
    display: flex;
    justify-content: space-between;
    padding-top: ${getVW(18)};
  }
  & .wrap .balance-ctrl.fee {
    padding-top: ${getVW(5)};
  }
  & .wrap .balance-ctrl span {
    font-size: ${getVW(18)};
    font-family: "Roboto bold";
    line-height: ${getVW(26)};
    color: #b8b8b8;
    vertical-align: middle;
  }
  & .wrap .balance-ctrl button {
    height: ${getVW(26)};
    margin-left: ${getVW(20)};
    border: none;
    color: #f5f5f5;
    background-color: transparent;
    font-size: ${getVW(14)};
    font-family: "Roboto bold";
    opacity: 0.8;
    transition: opacity 120ms ease;
  }
  & .wrap .balance-ctrl button:hover {
    opacity: 1;
  }
  & .wrap button.submit {
    width: 100%;
    margin-top: ${getVW(70)};
    height: ${getVW(70)};
    font-size: ${getVW(36)};
    font-family: "Roboto bold";
    color: #fff;
    border: none;
    border-radius: ${getVW(20)};
    background-image: linear-gradient(90deg, #e12b7c, #5863ce);
    box-shadow: 0 ${getVW(3)} ${getVW(6)} rgba(0, 0, 0, 0.16);
    transition: transform 120ms ease-out;
  }
  & .wrap button.submit:hover {
    background-image: linear-gradient(90deg, #ed448f, #5863ce);
    transform: translateY(-${getVW(2)});
  }
  & .wrap button.submit:disabled {
    color: rgba(255, 255, 255, 0.5);
    background-color: #433f5c;
    background-image: none;
    cursor: not-allowed;
  }
  & .wrap .error {
    position: absolute;
    font-size: ${getVW(18)};
    width: ${getVW(520)};
    text-align: right;
    color: #e0559c;
    padding-top: ${getVW(7)};
    padding-right: ${getVW(10)};
  }
  @media ${device.tablet} {
    top: 0;
    bottom: 0;
    left: 0;
    & .bg {
      width: 100%;
      margin: 0;
    }
    & .scrollwrap {
      width: calc(100% - ${mVW(60)});
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      margin-top: ${mVW(100)};
    }
    & .wrap {
      width: 100%;
      border-radius: ${mVW(10)};
      padding: ${mVW(7)} ${mVW(20)} ${mVW(73)} ${mVW(20)};
    }
    & .wrap button.close {
      top: ${mVW(15)};
      right: ${mVW(15)};
      width: ${mVW(17)};
      height: ${mVW(17)};
      opacity: 1;
    }
    & .wrap label.label {
      font-size: ${mVW(20)};
      margin-left: 0;
      margin-bottom: 0;
    }
    & .wrap label.sub-label {
      font-size: ${mVW(14)};
      margin-top: ${mVW(28)};
      margin-bottom: ${mVW(4)};
    }
    & .wrap input {
      width: 100%;
      height: ${mVW(29)};
      border-radius: ${mVW(5)};
      font-size: ${mVW(16)};
      padding: 0 ${mVW(15)};
    }
    & .wrap .balance-ctrl {
      padding-top: ${mVW(8)};
    }
    & .wrap .balance-ctrl.fee {
      padding-top: 0;
    }
    & .wrap .balance-ctrl span {
      font-size: ${mVW(14)};
      line-height: 1;
    }
    & .wrap .balance-ctrl button {
      font-size: ${mVW(16)};
      height: ${mVW(21)};
      margin-left: ${mVW(20)};
      opacity: 1;
    }
    & .wrap button.submit {
      margin-top: ${mVW(109)};
      height: ${mVW(44)};
      font-size: ${mVW(20)};
      border-radius: ${mVW(5)};
    }
    & .wrap .error {
      font-size: ${mVW(14)};
      width: calc(100% - ${mVW(40)});
    }
  }
`;

export const ModalCard = styled(Modal)`
  & .scrollwrap {
    width: ${getVW(696)};
  }
  & .wrap {
    width: ${getVW(680)};
    border: ${getVW(3)} solid #7158be;
    background-image: none;
    background-color: #3f3b4a;
    padding: ${getVW(13)} ${getVW(20)} ${getVW(28)} ${getVW(20)};
    box-shadow: 0 ${getVW(3)} ${getVW(15)} rgba(0, 0, 0, 0.2);
  }
  & .wrap button.close {
    width: ${getVW(25)};
    height: ${getVW(25)};
    top: ${getVW(30)};
    right: ${getVW(36)};
    color: #e8e8e8;
  }
  & .wrap label.label {
    font-size: ${getVW(36)};
    margin-left: 0;
    margin-bottom: ${getVW(37)};
    color: #e8e8e8;
  }
  .attr {
    display: flex;
    align-items: flex-start;
    margin-bottom: ${getVW(27)};
  }
  .attr label {
    font-size: ${getVW(24)};
    color: #e8e8e8;
    margin-right: ${getVW(30)};
  }
  .attr span,
  .attr .principal,
  .attr .aid {
    flex: 1;
    font-size: ${getVW(24)};
    color: #e8e8e8;
    text-align: right;
    word-break: break-all;
  }
  .attr .principal,
  .attr .aid {
    font-family: "Roboto bold";
    color: #59abf0;
  }
  @media ${device.tablet} {
    .scrollwrap,
    .wrap {
      width: ${mVW(315)};
      height: ${mVW(448)};
    }
    .wrap {
      padding: ${mVW(7)} ${mVW(20)};
    }
    .wrap button.close {
      top: ${mVW(15)};
      right: ${mVW(15)};
      width: ${mVW(17)};
      height: ${mVW(17)};
      opacity: 1;
    }
    .wrap label.label {
      font-size: ${mVW(20)};
      margin-bottom: ${mVW(27)};
    }
    .attr {
      margin-bottom: ${mVW(15)};
    }
    .attr label,
    .attr span,
    .attr span button.principal {
      font-size: ${mVW(14)};
    }
  }
`;

export const TwoAvatars = styled.div`
  position: relative;
  width: ${getVW(52)};
  min-width: ${getVW(52)};
  height: ${getVW(30)};
  & .AvatarIcon {
    position: absolute;
    top: 0;
  }
  & .AvatarIcon:first-child {
    left: 0;
    z-index: 10;
  }
  & .AvatarIcon:last-child {
    right: 0;
  }
`;
