import { Navbar, Button } from "@blueprintjs/core";
import { signIn, signOut, useSession } from "next-auth/react";
import styled from "styled-components";
import Image from "next/image";
import { Popover } from "antd";
import Link from "next/link";

const StyledAvatar = styled.div`
	border-radius: 50%;
	width: 30px;
	height: 30px;
`;

const AppNavbar = () => {
	const HomeLink = () => {
		return <Link href='/'></Link>;
	};

	const { data: session, status } = useSession();
	return (
		<Navbar>
			<Navbar.Group
				align='left'
				style={{
					backgroundColor: "transparent",
				}}>
				<Navbar.Heading>WoW Guild Helper</Navbar.Heading>
			</Navbar.Group>
			<Navbar.Group align='right'>
				<Link href='/'>
					<Button className='bp4-minimal' icon='home' text='Home' />
				</Link>

				<Navbar.Divider />
				{session ? (
					<>
						<Popover content={"Import data from WPE"} placement='bottom'>
							<Link href='/import'>
								<Button className='bp4-minimal' icon='document' text='Import' />
							</Link>
						</Popover>
						<Popover
							content={"View your available characters"}
							placement='bottom'>
							<Link href='/characters'>
								<Button
									className='bp4-minimal'
									icon='properties'
									text='Chars'
								/>
							</Link>
						</Popover>
						<Popover content={"Sign Out"} placement='bottom'>
							<Button
								className='bp4-minimal'
								icon='log-out'
								text={session.user.name}
								onClick={signOut}
							/>
						</Popover>
					</>
				) : (
					<Button
						className='bp4-minimal'
						icon='user'
						text='User'
						onClick={signIn}
					/>
				)}
			</Navbar.Group>
		</Navbar>
	);
};

export default AppNavbar;
