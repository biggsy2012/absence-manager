import Head from "next/head";
import Image from "next/image";
import AppNavbar from "../components/navbar";
import styled from "styled-components";
import { Button, Form, Input, Tooltip } from "antd";
import PocketBase from "pocketbase";
import { useState, useEffect } from "react";

const StyledDiv = styled.div`
	display: flex;
	color: white;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 10px;
	padding: 10px;
	margin: 10px;
`;

const StyledGrid = styled.div`
	color: white;
	align-items: center;
	justify-content: center;
	display: grid;
	grid-template-columns: auto auto auto auto;
	grid-template-rows: auto auto auto auto;

	grid-gap: 10px;
	padding: 10px;
	margin: 10px;
`;

const StyledGridItem = styled.div`
	color: white;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 10px;
	padding: 10px;
	margin: 10px;
`;

const StyledButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	color: white;
	background-color: #1a73e8;
	border: none;
	border-radius: 4px;
	padding: 10px;
	margin: 2px;
`;

const GetData = async () => {
	const db = new PocketBase("http://127.0.0.1:8090");
	const Data = await db.collection("users").getList();

	return Data;
};

function characters() {
	const [Data, setData] = useState({});
	const [Loading, setLoading] = useState(true);

	useEffect(() => {
		GetData().then((data) => {
			setData(data);
			setLoading(false);
		});
	}, []);

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div
				style={{
					zIndex: -1,
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					overflow: "hidden",
				}}>
				<Image
					src='/bg.jpg'
					alt='Background Image'
					layout='fill'
					objectFit='cover'
					quality={100}
				/>
			</div>

			<AppNavbar />
			<StyledDiv>
				<h1>Characters</h1>
				<Form>
					<Form.Item
						label='Name'
						name='name'
						rules={[
							{
								required: true,
								message: "Please input your char name!",
							},
						]}>
						<Input id='name' name='name' />
					</Form.Item>
					<Form.Item
						label='Class'
						name='class'
						rules={[
							{
								required: true,
								message: "Please input your Class!",
							},
						]}>
						<Input id='class' name='class' />
					</Form.Item>
					<Form.Item
						label='Spec'
						name='spec'
						rules={[
							{
								required: true,
								message: "Please input your Spec!",
							},
						]}>
						<Input id='spec' name='spec' />
					</Form.Item>
					<Form.Item>
						<Button type='primary' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>

				<StyledGrid>
					{Loading ? (
						<h1>Loading...</h1>
					) : (
						Data.items.map((item) => (
							<StyledGridItem key={item.name}>
								<h1>{item.name}</h1>
								<h2>{item.email}</h2>
								<h3>{item.id}</h3>
							</StyledGridItem>
						))
					)}
				</StyledGrid>
			</StyledDiv>
		</>
	);
}

export default characters;
