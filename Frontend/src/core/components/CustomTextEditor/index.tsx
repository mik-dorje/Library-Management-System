import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Card, Divider, Flex, Row, Tag, Typography } from "antd";
import Editor from "ckeditor5-custom-build";
// import Editor from "ckeditor5/build/ckeditor";
import { useState } from "react";
import ReactHtmlParser from "react-html-parser";

const CustomTextEditor = () => {
	const [EditorState, setEditorState] = useState("");
	const initialEditorState = `<figure class="image" style="height:26px;">
    <a href="https://every.to/"><img style="aspect-ratio:300/83;" src="https://every.to/assets/every-logo-b75354dcdc13d1d15c92a2c92b5f3b02dbcaaf13d271b12afae101e7bee2c98c.svg" width="300" height="83"></a>
</figure>
<figure class="image">
    <a href="https://every.to/napkin-math"><img style="aspect-ratio:50/50;" src="https://d24ovhgu8s7341.cloudfront.net/uploads/publication/logo/7/small_EVERY_NAPKIN_MATH.png" width="50" height="50"></a>
</figure>
<p style="margin-left:auto;text-align:center;">
    <a href="https://every.to/napkin-math"><span style="color:rgb(34,34,34);">Napkin Math</span></a>
</p>
<p style="margin-left:0px;text-align:center;">
    The AI Hardware <span style="color:rgb(34,34,34);">D</span>ilemma
</p>
<p style="margin-left:0px;text-align:center;">
    Why new devices are flopping—and how they might succeed
</p>
<p style="margin-left:0px;text-align:center;">
    BY <a href="https://every.to/@ItsUrBoyEvan">EVAN ARMSTRONG</a>
</p>
<p style="margin-left:0px;text-align:center;">
    MAY 2, 2024
</p>
<p style="margin-left:0px;text-align:center;">
    <strong>&nbsp;</strong><span style="color:rgb(88,139,189);"><strong>Listen</strong></span>
</p>
<figure class="image image_resized" style="width:27.8%;">
    <img style="aspect-ratio:1080/1080;" src="https://d24ovhgu8s7341.cloudfront.net/uploads/post/cover/3088/image2.png" width="1080" height="1080">
    <figcaption>
        DALL-E/Every illustration
    </figcaption>
</figure>
<p style="margin-left:0px;">
    &nbsp;
</p>
<p style="margin-left:0px;">
    <strong>Elevate your performance with mindfulness</strong>
</p>
<p style="margin-left:0px;">
    Don't miss out on early bird pricing for <a href="http://hiddendiscipline.xyz/">The Hidden Discipline</a>—ending Friday, May 3.
</p>
<p style="margin-left:0px;">
    This eight-week mindfulness course is designed specifically for busy, high-achieving individuals looking to unlock the "hidden discipline" that can transform their lives. Through live sessions, daily practice, and expert guidance, you'll gain the tools to:
</p>
<ul>
    <li>
        <p style="margin-left:0px;">
            Power through challenges with greater resilience
        </p>
    </li>
    <li>
        <p style="margin-left:0px;">
            Handle stress with ease and clarity
        </p>
    </li>
    <li>
        <p style="margin-left:0px;">
            Fully savor life's best moments
        </p>
    </li>
    <li>
        <p style="margin-left:0px;">
            Be more present and effective in every area of your life
        </p>
    </li>
</ul>
<p style="margin-left:0px;">
    For a limited time, Every subscribers can enroll for just <strong>$699—a 30 percent savings</strong>—by using code “<a href="https://buy.stripe.com/cN27sGdfL6dHbugfYY?prefilled_promo_code=EARLYBIRD">EARLY BIRD</a>” at checkout. But hurry—this offer ends on Friday, May 3.
</p>
<p style="margin-left:0px;">
    <strong>Take advantage of early bird pricing and unlock your full potential with </strong><a href="http://hiddendiscipline.xyz/"><strong>The Hidden Discipline</strong></a><strong> today.</strong>
</p>
<p style="margin-left:0px;">
    Want to sponsor Every? <a href="https://www.passionfroot.me/every">Click here</a>.
</p>
<p style="margin-left:0px;">
    <a href="https://www.passionfroot.me/every">Want to sponsor Every? Click here</a><span style="color:rgb(140,141,145)!important;">.</span>
</p>
<p style="margin-left:0px;">
    <i>Was this newsletter forwarded to you? </i><a href="https://every.to/account"><i>Sign up</i></a><i> to get it in your inbox.</i>
</p>
<p style="margin-left:0px;">
    &nbsp;
</p>
<hr>
<p style="margin-left:0px;">
    &nbsp;
</p>
<p style="margin-left:0px;">
    Over the past few weeks, new AI-powered hardware has been released to less-than-kind receptions—the Humane Pin was <a href="https://www.youtube.com/watch?v=TitZV6k8zfA&amp;pp=ygUTaHVtYW5lIGFpIHBpbiBta2JoZA%3D%3D">lampooned</a> and the Rabbit R1 was <a href="https://www.youtube.com/watch?v=ddTV12hErTc&amp;t=1013s&amp;pp=ygUPcmFiYml0IHIxIG1rYmhk">skewered</a>. While some people enjoyed the devices, it is safe to say these were not the launches the companies had hoped for. At the same time, other startups have raised <a href="https://www.fastcompany.com/91007630/avi-schiffmanns-tab-ai-necklace-has-raised-1-9-million-to-replace-god">millions</a> in venture capital to build new consumer hardware devices. Investors I know are actively looking to deploy money into the category, and Sam Altman and Jony Ive are in talks to raise up to <a href="https://www.theinformation.com/articles/jony-ive-and-sam-altmans-ai-device-startup-in-funding-talks-with-emerson-thrive?rc=yrmswp">a billion dollars</a> for a consumer hardware device.&nbsp;
</p>
<p style="margin-left:0px;">
    This disparity raises so many questions: Why are these new devices being received so poorly? What do founders and investors believe they’ll get by betting their careers on this difficult and clearly uphill battle? Will their bets actually work?&nbsp;
</p>
<p style="margin-left:0px;">
    To figure out the answers, I’ve been in the weeds with founders, talking product roadmaps, capital strategies, and levels of excitement. Here’s what I learned.
</p>
<p style="margin-left:0px;">
    <strong>Why is this hardware’s moment?&nbsp;</strong>
</p>
<p style="margin-left:0px;">
    The reasoning behind the rapid new launches and investor bets is simple. It’s AI.&nbsp;
</p>
<p style="margin-left:0px;">
    Many see AI as a technological paradigm shift akin to jumping from personal computers to mobile computing—and there is a chance that a new Apple could be built. With Palo Alto’s favorite fruit-centric company currently enjoying a $2.68 trillion market capitalization, people are feeling like Louis Armstrong did when he touched a trumpet for the first time (quite jazzed).
</p>
<p style="margin-left:0px;">
    I’ve previously <a href="https://every.to/napkin-math/ai-and-the-vision-pro-don-t-need-a-killer-app">argued</a> the components of a hardware device can be broken down into three groups:&nbsp;&nbsp;
</p>
<ol>
    <li>
        <p style="margin-left:auto;">
            <strong>Silicon: </strong>The chips running the computation for the device
        </p>
    </li>
    <li>
        <p style="margin-left:auto;">
            <strong>Interface: </strong>How you, as a user, interact with the device&nbsp;
        </p>
    </li>
    <li>
        <p style="margin-left:auto;">
            <strong>Sensors: </strong>The instruments providing data to the software running on a device—cameras, accelerometers, a GPS, a heartbeat sensor, etc.&nbsp;
        </p>
    </li>
</ol>
<p style="margin-left:0px;">
    New consumer devices are emerging because AI allows you to use the sensors, silicon, and interfaces developed for smartphones in novel ways. AI can take the <i>input</i> of large amounts of ambient data, such as the audio from your conversations and your behavior as you use your computer. Then, AI can <i>output</i> unique insights based on that corpus of data—much more personalized, sensitive, and accurate than what regular software can do today. It can also leverage existing data for new actions, such as following voice commands more closely. Basically, it’ll listen to what you say and bring out smart stuff that you missed.
</p>
<p style="margin-left:0px;">
    While my description may be banal, the possibilities are exciting. Smartphones are dominant, but aren’t perfect. Consumer addiction is—at least in my estimation—largely due to the monetization of smartphone app stores and the form factor of the device. If AI can evolve our relationships with devices, it’s a meaningful change. An AI ambiently crunching data and performing tasks without the distraction of a screen is net good for humanity. And, as a happy capitalistic coincidence, it would probably make the inventor of said device the owner of several large yachts.&nbsp;
</p>
<p style="margin-left:0px;">
    So if the promise is so wonderful, why is the category so challenging?
</p>
<p style="margin-left:0px;">
    <strong>The problem of the iPhone</strong>
</p>
<p style="margin-left:0px;">
    The answer is, once again, simple: The iPhone is too damn good.&nbsp;
</p>
<p style="margin-left:0px;">
    If I asked you to visualize what the iPhone disrupted, you’d probably think of an image like this—a brick cell phone, a digital camera, a GPS.
</p>
<p style="margin-left:0px;">
    &nbsp;
</p>
<figure class="image">
    <a href="https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3088/optimized_SC1we5cX-uWka7ScCC8HZcHqBwo9hd6-no7-9OvpWKjBj_YYQFOkGepSC0HSQnmI6zVUJaF-I9KdW4A3oICOSeyfigSu7V7PJDGm4n0vr0KYwaH-O6NN1oL31XdhePdG6iH-EGySaHjLePTcmAqWT44.png?link=true"><img style="aspect-ratio:1200/800;" src="https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3088/optimized_SC1we5cX-uWka7ScCC8HZcHqBwo9hd6-no7-9OvpWKjBj_YYQFOkGepSC0HSQnmI6zVUJaF-I9KdW4A3oICOSeyfigSu7V7PJDGm4n0vr0KYwaH-O6NN1oL31XdhePdG6iH-EGySaHjLePTcmAqWT44.png" width="1200" height="800"></a>
</figure>
<p style="margin-left:auto;">
    <i>Source: </i><a href="https://www.cnet.com/pictures/apple-iphone-and-the-gadgets-it-laid-to-rest/"><i>CNET</i></a><i>.</i>
</p>
<p style="margin-left:0px;">
    &nbsp;
</p>
<p style="margin-left:0px;">
    Apple’s disruption happened because <i>it brought the sensors in all these devices into one form factor. </i>Since the iPhone had a powerful chip and a multi-touch screen interface, it became a catch-all device that does pretty much everything pretty well. Sure, it isn’t perfect—the Kindle exists—but the smartphone is so incredible because the interface is flexible enough that it can do a good enough job at essentially everything a consumer needs.&nbsp;
</p>
<p style="margin-left:0px;">
    &nbsp;
</p>
<figure class="image">
    <a href="https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3088/optimized_VTZEpwe95SFE_c8qJyjkEldw9y71qOn2M12XldJ-aqVn_1Pg3a1HWxieRpEeVI3_lD-7dxI4Uv2YrtwO8wrKcuTpCsi5LWqF-fUeLxYrHq-gjtdyKm2cU_ll8RUk4o2IMtq402UuALQsZ9wlqIcO0Ao.png?link=true"><img style="aspect-ratio:1400/846;" src="https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3088/optimized_VTZEpwe95SFE_c8qJyjkEldw9y71qOn2M12XldJ-aqVn_1Pg3a1HWxieRpEeVI3_lD-7dxI4Uv2YrtwO8wrKcuTpCsi5LWqF-fUeLxYrHq-gjtdyKm2cU_ll8RUk4o2IMtq402UuALQsZ9wlqIcO0Ao.png" width="1400" height="846"></a>
</figure>
<p style="margin-left:auto;">
    <i>Source: Every illustration.</i>
</p>
<p style="margin-left:0px;">
    &nbsp;
</p>
<p style="margin-left:0px;">
    Apple has spent 18 years and hundreds of billions of dollars stuffing ever-better components into ever-more-powerful phones. Its market dominance has yielded a supply chain and manufacturing partners that a startup can’t hope to match.&nbsp;
</p>
<p style="margin-left:0px;">
    An AI hardware company is in the unenviable position of having inferior sensors than Apple, generic silicon chips, and a grand total of zero developers in its ecosystem. It is very, very hard to compete with an iPhone when every piece of hardware you have access to is worse. So these companies have to try to innovate on the interface. My current favorite AI hardware device, the Meta Ray-Bans, eschew multi-touch glass in favor of voice activation. The R1 has a scroll wheel, and Humane uses a laser projector.&nbsp;
</p>
<p style="margin-left:0px;">
    When you’re playing with these odds, your best bet is to differentiate on the software—not the hardware. Which means that, basically, most consumer AI hardware should just be an app. One founder told me as much: “My company should probably just be an app, but hardware sounded more fun.” While this statement may be true, customers do not particularly care about how good of a time a CEO is having.&nbsp;
</p>
<p style="margin-left:0px;">
    And if AI is what has gotten the market so excited, it should be the competitive edge, too. Both Rabbit and Humane’s products have been reviewed so critically because while the hardware is beautiful, they are less powerful and generalizable than the smartphone. And in both devices, the redeeming factor of AI doesn’t actually work—large language models are not good enough yet to be virtual assistants. The hardware was rushed to market before the AI was ready. As popular reviewer Marques Brownlee, aka MKBHD, <a href="https://twitter.com/MKBHD/status/1785102259740667960">said</a>:
</p>
<p style="margin-left:0px;">
    “This is the pinnacle of a trend that's been annoying for years: Delivering barely finished products to win a ‘race’ and then continuing to build them after charging full price. Games, phones, cars, now AI in a box.”
</p>
<p style="margin-left:0px;">
    But if we wait for the AI to be “ready,” we’ll run into more problems. It is incredibly expensive and challenging to differentiate on the basis of AI models. Like I just <a href="https://every.to/napkin-math/the-ai-wars-have-begun">wrote</a>, open-source can now provide GPT-4-levels of performance, so startups have to train a model to do something no other open-source model can—adding scientific research to the many hurdles that they’re trying to conquer.&nbsp;
</p>
<p style="margin-left:0px;">
    <strong>What happens next with AI hardware?</strong>
</p>
<p style="margin-left:0px;">
    To be clear, I very much want these companies to succeed. As a red-blooded capitalist, I love competition. To compete with Apple, AI hardware companies have three paths:
</p>
<ol>
    <li>
        <p style="margin-left:auto;">
            <strong>Get weird with it.</strong> Explore use cases that are fundamentally different from smartphones. By focusing on markets where phones have proven ineffectual, such as healthcare or manufacturing, companies can carve out a space for themselves. Experimenting with unconventional interfaces like brain-computer interfaces, haptics, or augmented reality could also help them stand out.&nbsp;
        </p>
    </li>
    <li>
        <p style="margin-left:auto;">
            <strong>Go screen-free. </strong>Develop AI-powered devices that primarily rely on voice interactions, such as the Meta Ray-Bans. Ironically, Humane may have been right on this count.&nbsp;
        </p>
    </li>
    <li>
        <p style="margin-left:auto;">
            <strong>Rely on the phone. </strong>Rather than trying to replace smartphones entirely, focus on using the smartphone’s silicon and interface, with a hardware component acting as a supplemental sensor to gather data. <a href="https://www.fastcompany.com/91007630/avi-schiffmanns-tab-ai-necklace-has-raised-1-9-million-to-replace-god">Tab</a> and <a href="https://www.limitless.ai/">Limitless</a> are taking this approach: They sell an extra sensor, but the software lives in the cloud, and the hardware requires a connection to a phone via Bluetooth.&nbsp;
        </p>
    </li>
</ol>
<p style="margin-left:0px;">
    Venture-backed startups have an over 90 percent failure rate. These companies' struggles and long odds are a feature, not a bug. We should be cheering for every single founder trying something new. There is a viable path! But it requires something wholly new and different. Startups doing the same-old end up with the same-old result—failure.&nbsp;
</p>
<p style="margin-left:0px;">
    &nbsp;
</p>
<hr>
<p style="margin-left:auto;">
    <i><strong>Evan Armstrong</strong> is the lead writer for Every, where he writes the </i><a href="https://every.to/napkin-math"><i>Napkin Math</i></a><i> column. You can follow him on X at </i><a href="https://twitter.com/itsurboyevan"><i>@itsurboyevan</i></a><i> and on </i><a href="https://www.linkedin.com/in/evan-armstrong-701bb792/"><i>LinkedIn</i></a><i>, and Every on X at </i><a href="https://twitter.com/every"><i>@every</i></a><i> and on </i><a href="https://www.linkedin.com/company/everyinc/"><i>LinkedIn</i></a><i>.</i>
</p>
<p style="margin-left:0px;">
    &nbsp;
</p>`;

	return (
		<Flex className="ck-content" vertical gap="middle">
			<CKEditor
				editor={Editor}
				data={initialEditorState}
				onReady={(editor) => {
					console.log("Editor is ready to use!", editor);
					const data = editor.getData();
					setEditorState(data);
				}}
				onChange={(_, editor) => {
					const data = editor.getData();
					console.log({ data });
					setEditorState(data);
				}}
				onBlur={() => {}}
				onFocus={() => {}}
				config={{
					placeholder: "Description here...",
					heading: {
						options: [
							{
								model: "paragraph",
								title: "Paragraph",
								class: "ck-heading_paragraph",
							},
							{
								model: "heading1",
								title: "Heading 1",
								class: "ck-heading_heading1",
								view: {
									name: "h1",
									classes: "ck-heading_heading1",
								},
							},
							{
								model: "heading2",
								title: "Heading 2",
								class: "ck-heading_heading2",
								view: {
									name: "h2",
									classes: "ck-heading_heading2",
								},
							},
							{
								model: "heading3",
								title: "Heading 3",
								class: "ck-heading_heading3",
								view: {
									name: "h3",
									classes: "ck-heading_heading3",
								},
							},
							{
								model: "heading4",
								title: "Heading 4",
								class: "ck-heading_heading4",
								view: {
									name: "h4",
									classes: "ck-heading_heading4",
								},
							},
							{
								model: "heading5",
								title: "Heading 5",
								class: "ck-heading_heading5",
								view: {
									name: "h5",
									classes: "ck-heading_heading5",
								},
							},
							{
								model: "heading6",
								title: "Heading 6",
								class: "ck-heading_heading6",
								view: {
									name: "h6",
									classes: "ck-heading_heading6",
								},
							},
						],
					},

					style: {
						definitions: [
							{
								name: "Article category",
								element: "span",
								classes: ["category"],
							},
							{
								name: "Title",
								element: "span",
								classes: ["document-title"],
							},
							{
								name: "Subtitle",
								element: "span",
								classes: ["document-subtitle"],
							},
							{
								name: "Info box",
								element: "p",
								classes: ["info-box"],
							},
							{
								name: "Side quote",
								element: "span",
								classes: ["side-quote"],
							},
							{
								name: "Marker",
								element: "span",
								classes: ["marker"],
							},
							{
								name: "Spoiler",
								element: "span",
								classes: ["spoiler"],
							},
							{
								name: "Code (dark)",
								element: "p",
								classes: ["fancy-code", "fancy-code-dark"],
							},
							{
								name: "Code (bright)",
								element: "p",
								classes: ["fancy-code", "fancy-code-bright"],
							},
						],
					},
				}}
			/>
			<Divider className="m-0" />
			<Row justify="center">
				<Tag color="green-inverse" style={{ padding: "2px 6px" }}>
					Parsed Output
				</Tag>
			</Row>

			<Card
				style={{
					whiteSpace: "pre-line",
					background: "white",
					padding: 24,
					border: "2px solid #dfdfdf",
					width: "100%",
				}}
			>
				{ReactHtmlParser(EditorState)}
			</Card>
		</Flex>
	);
};

export default CustomTextEditor;
