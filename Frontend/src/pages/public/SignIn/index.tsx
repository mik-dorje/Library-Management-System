import {
	Button,
	Card,
	Checkbox,
	Col,
	Flex,
	Form,
	Image,
	Input,
	Row,
	Space,
	Typography,
	message,
	theme,
} from "antd";
import Logo from "@/core/components/Logo";
import { ISignInRequest } from "@/schema/auth.schema";
import { useAuth } from "@/providers/AuthProvider";
import TokenService from "@/services/token-storage";
import { protectedRoutePaths } from "@/router";
import backgroundImg from "@/assets/vectors/imgLoginPage.svg";
import { useEffect, useRef } from "react";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useSignUserIn } from "./api/queries";

const { useToken } = theme;

const SignIn = () => {
	const { token } = useToken();
	const { mutate: signUserIn, isPending: isSigningUserIn } = useSignUserIn();

	const [signInForm] = Form.useForm();
	const userRef = useRef<any>(null);

	const { setAuthUser } = useAuth();

	useEffect(() => {
		const initialFormValues = [
			{
				name: "user",
				value: "mikdorje",
			},
			{
				name: "pwd",
				value: "Allgood@123",
			},
		];
		signInForm.setFields(initialFormValues);
	}, [signInForm]);

	const handleFormFinish = (values: ISignInRequest) => {
		signUserIn(values, {
			onSuccess: (res) => {
				console.log({ res });
				if (res.accessToken) {
					setAuthUser({ email: res.result.username });
					TokenService.setAccessToken(res.accessToken);
					TokenService.setRefreshToken(res.result.refreshToken);
					window.location.replace(protectedRoutePaths.testDashboard);
				} else {
					message.error("Sign in failed, please try again later");
				}
			},
		});
	};

	return (
		<Row
			style={{
				background: `url(${backgroundImg})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundPosition: "center",
				height: "100vh",
				fontFamily: token.fontFamily,
				padding: "0 12.6vw",
			}}
		>
			<Col
				md={{ span: 13 }}
				xs={{ span: 0 }}
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Row>
					<Col md={{ span: 24 }} xs={{ span: 0 }}>
						<Space
							style={{
								marginBottom: "0.75rem",
							}}
						>
							<Logo width={75} />

							<Typography.Text
								style={{
									color: "white",
									fontSize: "2.6rem",
									fontWeight: 700,
									lineHeight: "60px",
								}}
							>
								{"Book Rental System"}
							</Typography.Text>
						</Space>
					</Col>

					<Col md={{ span: 24 }} xs={{ span: 0 }}>
						<Typography.Title
							level={4}
							style={{
								color: "white",
								fontSize: "2.4rem",
								fontWeight: 600,
								lineHeight: "46.87px",
							}}
						>
							Embrace Knowledge...
						</Typography.Title>
					</Col>

					<Col md={{ span: 24 }} xs={{ span: 0 }}>
						<Space
							direction="vertical"
							style={
								{
									// width: '74%'
									// maxWidth: "396px",
								}
							}
						>
							<Typography.Text
								style={{
									color: "white",
									fontSize: "1.4rem",
									fontWeight: 400,
									lineHeight: "27px",
								}}
							>
								Explore New Worlds Without Breaking the Bank:
								Rent Books and Unleash Your Imagination
							</Typography.Text>
							<Flex vertical>
								<Typography.Text
									style={{
										color: "orange",
										fontSize: "1.4rem",
										fontWeight: 500,
										lineHeight: "27px",
									}}
								>
									Username : mikdorje
								</Typography.Text>
								<Typography.Text
									style={{
										color: "orange",
										fontSize: "1.4rem",
										fontWeight: 500,
										lineHeight: "27px",
									}}
								>
									Password : Allgood@123
								</Typography.Text>
							</Flex>
						</Space>
					</Col>
				</Row>
			</Col>

			<Col
				md={{ span: 11 }}
				xs={{ span: 24 }}
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Row>
					<Col md={{ span: 0 }} xs={{ span: 24 }} className="mb-2">
						<Space>
							<Logo width={50} />
							<Typography.Text
								style={{
									color: "white",
									fontSize: "36px",
									fontWeight: 500,
									lineHeight: "60px",
								}}
							>
								{"Book Rental System"}
							</Typography.Text>
						</Space>
					</Col>

					<section
						style={{
							width: "424px",
							padding: "36px 38px",
							borderRadius: "12px",
							display: "flex",
							flexDirection: "column",
							boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
						}}
						className="form-container"
					>
						<Typography.Text
							style={{ fontSize: "12px", fontWeight: 400 }}
						>
							{`LET'S GET YOU STARTED`}
						</Typography.Text>

						<Typography.Text
							style={{
								fontSize: "24px",
								fontWeight: 500,
							}}
						>
							Login to your account
						</Typography.Text>

						<Form
							form={signInForm}
							layout="vertical"
							onFinish={handleFormFinish}
						>
							<Form.Item
								label="Username"
								name="user"
								rules={[
									{
										required: true,
										message: "Username is required",
									},
								]}
								style={{ marginBottom: 8 }}
							>
								<Input
									prefix={<UserOutlined />}
									ref={userRef}
								/>
							</Form.Item>
							<Form.Item
								label="Password"
								name="pwd"
								rules={[
									{
										required: true,
										message: "Password is required",
									},
								]}
								style={{ marginBottom: 8 }}
							>
								<Input.Password
									type="password"
									prefix={<LockOutlined />}
								/>
							</Form.Item>
							<Form.Item
								name="rememberMe"
								valuePropName="checked"
								style={{ marginBottom: 8 }}
							>
								<Checkbox>Remember Me</Checkbox>
							</Form.Item>

							<Space
								style={{
									width: "100%",
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<Button
									type="link"
									className="px-1 text-primary"
								>
									Forgot Your Password ?
								</Button>

								<Button
									type="primary"
									loading={isSigningUserIn}
									htmlType="submit"
								>
									Sign In
								</Button>
							</Space>
						</Form>
					</section>
				</Row>
			</Col>
		</Row>
	);
};

export default SignIn;
