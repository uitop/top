import { useRouter } from "next/router";
import HomeIcon from "@/icons/HomeIcon";
import styled from "@emotion/styled";
import Link from "next/link";
const Header =styled.header`
position: fixed;
top:10px;
left:10px;
z-index: 5;
	svg{
		width:30px;
		height: 30px;
		path{
			fill: green;
		}
	}
`
const RootLayout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const router = useRouter()
	return (
		<>
			{router.pathname !=='/' && <Header>
				<Link href="/">
					<HomeIcon/>
				</Link>
			</Header>}
			{children}
		</>
	);
}
export default RootLayout