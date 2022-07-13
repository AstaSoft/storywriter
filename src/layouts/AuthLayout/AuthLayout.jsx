import React from "react";
import classnames from "classnames";
import SignInForm from "../../forms/SignInForm";
import styles from "./styles.module.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const AuthLayout = () => {
	return (
		<BrowserRouter>
			<div>
				<header className={classnames(styles.headerView)}>
					<h1 className={classnames("header1", "textC")}>StoryWriter</h1>
				</header>
				<main className={classnames("mainly")}>
					<Switch>
						<Route
							path="/"
							exact
							render={() => (
								<div className={styles.formWraper}>
									<SignInForm />
								</div>
							)}
						/>
					</Switch>
				</main>
			</div>
		</BrowserRouter>
	);
};

export default AuthLayout;
