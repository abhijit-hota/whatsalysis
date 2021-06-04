import styled, { css } from "styled-components";

export const Heading = styled.h1`
	color: #075e54;
`;

export const Box = styled.div`
	background-color: #fdfdfd;
	border-radius: 0.5em;
	width: 100%;
	margin: 1em 0;
	padding: 1em 0;
`;

export const VizContainer = styled.div`
	--gap: 1em;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap));
	width: calc(100% + var(--gap));
	& > div {
		padding: 1em;
		flex: 1 1 400px;
		margin: var(--gap) 0 0 var(--gap);
	}
`;

export const ListItem = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 0.25em;
	&:hover {
		background: #efefef;
	}
`;
