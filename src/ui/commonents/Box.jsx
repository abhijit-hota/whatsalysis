import styled, { css } from "styled-components";

export const Heading = styled.h1`
	color: #075e54;
`;

export const AppContainer = styled.div`
	width: 99vw;
	@media (min-width: 768px) {
		width: 80vw;
	}
`;

export const Box = styled.div`
	background-color: #fdfdfd;
	border-radius: 1em;
	width: 100%;
	margin: 0.5em;
	padding: 1em;
`;

export const VizContainer = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	justify-content: space-between;
	& > div {
		flex: 1 1 400px;
	}
`;
