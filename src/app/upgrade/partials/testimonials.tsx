/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useTheme, styled } from "@mui/material/styles";
import { Box, Typography, IconButton, Container, Button } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Helmet } from "react-helmet";
// import useMediaQuery from "../../../../utils/media";
import useMediaQuery from "@mui/material/useMediaQuery";

const cardSize = "23rem";
const MAX_VISIBILITY = 3;
const colorGray = "#9CA3AF";

const cards = [
	{
		title: "vasisht hari",
		// eslint-disable-next-line no-irregular-whitespace
		text: `@metaintro is really an amazing community to find jobs in #web3    Basically, this community is a go-to place for people who are in search of a job tbh. Perhaps give it a shot.🥂`,
		embed: (
			<blockquote className="twitter-tweet">
				<p
					lang="en"
					dir="ltr"
				>
					<a href="https://twitter.com/metaintro?ref_src=twsrc%5Etfw">@metaintro</a> is really an amazing community to
					find jobs in <a href="https://twitter.com/hashtag/web3?src=hash&amp;ref_src=twsrc%5Etfw">#web3</a> <br />
					Basically, this community is a go-to place for people who are in search of a job tbh.
					<br />
					Perhaps give it a shot.🥂 <a href="https://t.co/zmbDaM8Keg">pic.twitter.com/zmbDaM8Keg</a>
				</p>
				&mdash; vasisht hari (@VasishtHari){" "}
				<a href="https://twitter.com/VasishtHari/status/1726612244015067588?ref_src=twsrc%5Etfw">November 20, 2023</a>
			</blockquote>
		)
	},
	{
		title: "Max Webster-Dowsing",
		text: `Shout out to @metaintro they are by far the best repository of all things careerwise in Web3. Everything from startups, networking, specialism help with your resume, and more.`,
		embed: (
			<blockquote className="twitter-tweet">
				<p
					lang="en"
					dir="ltr"
				>
					Reminder that <a href="https://twitter.com/metaintro?ref_src=twsrc%5Etfw">@metaintro</a> always have the best
					jobs and most are high paying positions. Technical and non technical. <br />
					<br />
					Look into the Web3/ Blockchain industry. Your skills are needed.
				</p>
				&mdash; Katiascylife (@katiascylife){" "}
				<a href="https://twitter.com/katiascylife/status/1693955249784893570?ref_src=twsrc%5Etfw">August 22, 2023</a>
			</blockquote>
		)
	},
	{
		title: "leoclark.⌐◨-◨ 🛡️",
		avatar: "https://pbs.twimg.com/profile_images/1460512355192696833/3kgNSH3__x96.jpg",
		text: `Hey Seneca, @metaintro has a daily email with crypto job listings. Best of luck to him🫡`,
		embed: (
			<blockquote className="twitter-tweet">
				<p
					lang="en"
					dir="ltr"
				>
					Hey Seneca, <a href="https://twitter.com/metaintro?ref_src=twsrc%5Etfw">@metaintro</a> has a daily email with
					crypto job listings. Best of luck to him🫡
				</p>
				&mdash; leoclark.⌐◨-◨ 🛡️ (@leoclark___){" "}
				<a href="https://twitter.com/leoclark___/status/1685003954827005952?ref_src=twsrc%5Etfw">July 28, 2023</a>
			</blockquote>
		)
	},
	{
		title: "TheZachMamba",
		text: `Check out @metaintro if you haven’t already`,
		embed: (
			<blockquote className="twitter-tweet">
				<p
					lang="en"
					dir="ltr"
				>
					Check out <a href="https://twitter.com/metaintro?ref_src=twsrc%5Etfw">@metaintro</a> if you haven’t already
				</p>
				&mdash; TheZachMamba (@TheZachMamba){" "}
				<a href="https://twitter.com/TheZachMamba/status/1626329031120396292?ref_src=twsrc%5Etfw">February 16, 2023</a>
			</blockquote>
		)
	},
	{
		title: "Jessica Krisheila",
		text: `Loved @metaintro mail this morning - asking us *directly* what typa jobs we are looking for. That's ivy!`,
		embed: (
			<blockquote className="twitter-tweet">
				<p
					lang="en"
					dir="ltr"
				>
					Loved <a href="https://twitter.com/metaintro?ref_src=twsrc%5Etfw">@metaintro</a> mail this morning - asking us
					*directly* what typa jobs we are looking for. That's ivy!
				</p>
				&mdash; Jessica Krisheila (@jessicakrisheil){" "}
				<a href="https://twitter.com/jessicakrisheil/status/1618126174793924608?ref_src=twsrc%5Etfw">
					January 25, 2023
				</a>
			</blockquote>
		)
	}
] as CardProps[];

const TestimonialsWrapper = styled(Box)({
	display: "flex",
	overflow: "hidden",
	alignItems: "center",
	boxSizing: "border-box",
	justifyContent: "center"
});

const CarouselWrapper = styled(Box)({
	position: "relative",
	width: cardSize,
	minHeight: cardSize,
	height: "auto",
	perspective: "500px",
	boxSizing: "border-box",
	transformStyle: "preserve-3d"
});

const CardWrapper = styled(Box)({
	width: "100%",
	maxHeight: "360px",
	overflow: "scroll",
	position: "absolute",
	borderRadius: "1rem",
	boxSizing: "border-box",
	transition: "all 0.3s ease-out"
});

const CardContent = styled(Box)({
	width: "100%",
	height: "100%",
	overflow: "scroll",
	scrollbarWidth: "none",
	"-webkit-scrollbar-width": "none",
	color: colorGray,
	borderRadius: "1rem",
	textAlign: "justify",
	boxSizing: "border-box",
	transition: "all 0.3s ease-out"
});

interface CarouselControlsProps {
	children: any;
	active: number;
	setActive: any;
}

interface DotIndicatorProps {
	numberOfDots: number;
	activeIndex: number;
	setActive: any;
}

function DotIndicator({ numberOfDots, activeIndex, setActive }: DotIndicatorProps) {
	const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
	return (
		<Box
			sx={{
				textAlign: "center",
				position: isMobile ? "relative" : "unset",
				top: isMobile ? "-16px" : "unset"
			}}
		>
			{Array.from({ length: numberOfDots }, (_, index) => (
				<IconButton
					key={index}
					onClick={() => setActive(index)}
					sx={{
						color: activeIndex === index ? "white" : "#9CA3AF"
					}}
				>
					•
				</IconButton>
			))}
		</Box>
	);
}

// const CarouselControls: FC<CarouselControlsProps> = ({ children, active, setActive }: CarouselControlsProps) => {
function CarouselControls({ children, active, setActive }: CarouselControlsProps) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<>
			{active > 0 && (
				<Button
					sx={{
						zIndex: 9999,
						borderRadius: "0",
						height: "100%",
						position: "absolute",
						top: "50%",
						left: isMobile ? "-11px" : "calc(-65% + 64px)",
						transform: "translateY(-50%)"
					}}
					onClick={() => setActive((i: any) => i - 1)}
				>
					<KeyboardArrowLeftIcon
						sx={{
							fontSize: isMobile ? "2.6rem" : "4rem",
							color: isMobile ? "#394AB9" : "white"
						}}
					/>
				</Button>
			)}
			{children}
			{active < cards.length - 1 && (
				<Button
					sx={{
						zIndex: 9999,
						borderRadius: "0",
						height: "100%",
						position: "absolute",
						top: "50%",
						right: isMobile ? "-11px" : "calc(-65% + 64px)",
						transform: "translateY(-50%)"
					}}
					onClick={() => setActive((i: any) => i + 1)}
				>
					<KeyboardArrowRightIcon
						sx={{
							fontSize: isMobile ? "2.6rem" : "4rem",
							color: isMobile ? "#394AB9" : "white"
						}}
					/>
				</Button>
			)}
		</>
	);
}

interface CardProps {
	text: string;
	title: string;
	index?: number;
	avatar?: string;
	embed?: any;
	activeIndex?: number;
}

// const Card: FC<CardProps> = ({ title, text, embed, index = 0, activeIndex = 2, avatar }: CardProps) => {
function Card({ title, text, embed, index = 0, activeIndex = 2, avatar }: CardProps) {
	const active = index === activeIndex;
	const offset = (activeIndex - index) / 3;
	const pointerEvents = active ? "auto" : "none";
	const direction = Math.sign(activeIndex - index);
	const absOffset = Math.abs(activeIndex - index) / 3;
	const opacity = Math.abs(activeIndex - index) >= MAX_VISIBILITY ? 0 : 1;
	const display = Math.abs(activeIndex - index) > MAX_VISIBILITY ? "none" : "block";

	const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));

	return (
		<CardWrapper
			key={index}
			sx={{
				opacity,
				display,
				pointerEvents,
				filter: `blur(${absOffset * 1}rem)`,
				transform: `
                    rotateY(${offset * 50}deg)
                    scaleY(${1 + absOffset * -0.4})
                    translateZ(${absOffset * -30}rem)
                    translateX(${direction * -5}rem)
                `
			}}
		>
			<CardContent
				sx={{
					justifyContent: "center",
					margin: isMobile ? "0 auto" : "unset",
					maxWidth: isMobile ? "calc(100% - 8rem)" : "unset",
					backgroundColor: `hsl(280deg, 40%, calc(100% - ${absOffset * 50}%))`
				}}
			>
				{embed || null}
				<Helmet>
					<script
						async
						src="https://platform.twitter.com/widgets.js"
						charSet="utf-8"
					/>
				</Helmet>
			</CardContent>
		</CardWrapper>
	);
}

interface CarouselProps {
	cards: CardProps[];
	active: number;
	setActive: any;
}

function Carousel({ cards, active, setActive }: CarouselProps) {
	return (
		<>
			<CarouselWrapper>
				<CarouselControls
					active={active}
					setActive={setActive}
				>
					{cards.map((card, i) => (
						<Card
							key={i}
							{...card}
							index={i}
							activeIndex={active}
						/>
					))}
				</CarouselControls>
			</CarouselWrapper>
			<DotIndicator
				numberOfDots={cards.length}
				activeIndex={active}
				setActive={setActive}
			/>
		</>
	);
}

// const ARROWS_OFFSET = 144;
// const Testimonials: FC = () => {
function Testimonials() {
	const [active, setActive] = useState(1);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<Box
			sx={{
				padding: isMobile ? "0" : "3rem 0",
				backgroundColor: "#1e293b"
			}}
		>
			<Container
				sx={{
					padding: isMobile ? 0 : "unset"
				}}
			>
				<Typography
					sx={{
						color: "white",
						fontSize: isMobile ? "18px" : "2.2rem",
						fontWeight: "900",
						textAlign: "center",
						padding: isMobile ? "24px 0" : "0 0 2rem 0",
						boxSizing: "border-box",
						transition: "all 0.3s ease-out"
					}}
				>
					Metaintro in the Spotlight 💬
				</Typography>
				<TestimonialsWrapper>
					<CarouselWrapper>
						<Carousel
							active={active}
							setActive={setActive}
							cards={cards}
						/>
					</CarouselWrapper>
				</TestimonialsWrapper>
			</Container>
		</Box>
	);
}

export default Testimonials;
