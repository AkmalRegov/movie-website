import React from "react";
import styled from "styled-components";
// import { SiStyledcomponents as StyledComponentsLogo } from "react-icons/si";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginAccountDiv } from "./LoginAccountDiv";
// import StyledComponentsPng from "../../src/nav-logo.png";

const SNavbarDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  padding-bottom: 0;
`;

const LogoDiv = styled.div`
  margin-left: 1rem;
  padding-bottom: 0.75rem;
`;

const SLanguageDiv = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 20px;
  border: 2px solid black;
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
  padding: 0.5rem;
  margin-right: 1rem;
  margin-bottom: 10px;
`;

const SMenubarDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 4px;
  font-size: 1.5rem;
  line-height: 2rem;
  text-align: center;
  margin: auto;
  gap: 1rem;
  position: relative;
  bottom: 4px;
`;

const SClickableMenubarDiv = styled.div`
  cursor: pointer;
  color: #272343;
  /* margin-left: 8vw; */
`;

const SLoginDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const SLoginButton = styled.button`
  border: 1px solid green;
  background-color: green;
  border-radius: 4rem;
  width: 5rem;
  height: 3rem;
  color: white;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const SLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => (props.to !== props.className ? "black" : "blue")};

  &:hover {
    color: blue;
  }
`;

export const Navbar: React.FC<{
  menu?: string;
  menuRoute?: string;
}> = ({ menu, menuRoute }) => {
  const navigate = useNavigate();
  const currentURL = useLocation();
  //   console.log("currentURL.pathname is: ", currentURL.pathname);
  //   const { state: userAccessState, dispatch: userAccessDispatch } = useContext(UserAccessContext);
  return (
    <>
      <div style={{ border: "1px solid black" }}>
        <SNavbarDiv>
          {/* <LogoDiv>
            <div style={{ backgroundColor: "black" }}>
              <img
                src={StyledComponentsPng}
                alt={`A logo of styled-components that is used to style web apps`}
                style={{ width: "220px" }}
              />
            </div>
          </LogoDiv> */}
          {/* <LoginAccountDiv /> */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <SLanguageDiv>
              English
              <IoIosArrowDown />
            </SLanguageDiv>
            <SMenubarDiv>
              {/* <SClickableMenubarDiv
              onClick={() => {
                navigate(menuRoute ?? "/");
              }}
            >
              {menu ?? "Home"}
            </SClickableMenubarDiv> */}
              <SLink to={"/"} className={currentURL.pathname}>
                Home
              </SLink>
              <SLink to={"#"} className={currentURL.pathname}>
                Watchlist
              </SLink>
            </SMenubarDiv>
          </div>
          <div style={{ display: "flex", position: "relative", bottom: "4px" }}>
            <LoginAccountDiv />
          </div>
        </SNavbarDiv>
      </div>
    </>
  );
};
