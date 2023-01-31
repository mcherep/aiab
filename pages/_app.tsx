import { useState, useEffect } from "react";
import NextApp, { AppProps, AppContext } from "next/app";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import Head from "next/head";
import { MantineProvider, ColorScheme, ColorSchemeProvider, AppShell, Center, Header, Title, Text, Grid, ActionIcon } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons";
import { MathJaxContext } from "better-react-mathjax";
import myTheme from "../data/theme.yaml";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
    const { Component, pageProps } = props;
    const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
    const [doRender, setDoRender] = useState<boolean>(false);
    const router = useRouter();
    
    useEffect(() => setDoRender(true), []);

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === "dark" ? "light" : "dark");
        setColorScheme(nextColorScheme);
        setCookie("mantine-color-scheme", nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
    };

    return (
        <>
            <Head>
                <title>How to Put Almost Anything in a Browser</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="shortcut icon" href="/favicon.svg" />
            </Head>


            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider
                    theme={{
                        colorScheme: colorScheme,
                        defaultGradient: myTheme[colorScheme].defaultGradient,
                        primaryColor: myTheme[colorScheme].defaultColor,
                        components: {
                            Anchor: {
                                defaultProps: {
                                    target: "_blank",
                                    rel: "noreferrer"
                                }
                            }
                        }
                    }}
                    withGlobalStyles
                    withNormalizeCSS
                >
                    {doRender &&
                        <MathJaxContext>
                            <Center>
                                <AppShell style={{width: "100%", maxWidth: "96em"}}>
                                    <Header height={100} sx={(theme) => ({backgroundColor: myTheme[theme.colorScheme].headerBackground, boxShadow: myTheme[theme.colorScheme].headerShadow})}>
                                        <Grid columns={3} m={"md"} justify={"space-between"}>
                                            <div>
                                                <Title order={1} size={20} p={"md"} display={"inline"} onClick={() => router.push("/")} style={{fontVariant: "small-caps"}}>How to Put Almost Anything in a Browser</Title>
                                                <Title order={2} size={12} p={"md"} pt={"xs"} pb={0} color={"dimmed"} style={{fontVariant: "small-caps"}}>MIT Media Lab</Title>
                                                <Title order={2} size={12} p={"md"} pt={0} style={{fontVariant: "small-caps"}}>Festival of Learning 2023</Title>
                                            </div>
                                            <div>
                                                <ActionIcon display={"inline"} size={myTheme.iconSize} onClick={() => toggleColorScheme()} sx={(theme) => ({color: theme.colors[theme.primaryColor][6]})}>
                                                    {(colorScheme == "light") ? <IconMoon size={myTheme.iconSize}/> : <IconSun size={myTheme.iconSize}/>}
                                                </ActionIcon>
                                                <Text display={"inline"} p={0} pl={"xs"} variant={"gradient"}><b>{colorScheme.charAt(0).toUpperCase() + colorScheme.slice(1)}</b> Theme</Text>
                                            </div>
                                        </Grid>
                                    </Header>
                                    <Component {...pageProps}/>
                                </AppShell>
                            </Center>
                        </MathJaxContext>}
                </MantineProvider>
            </ColorSchemeProvider>
        </>
    );
}

App.getInitialProps = async (appContext: AppContext) => {
    const appProps = await NextApp.getInitialProps(appContext);
    return {
        ...appProps,
        colorScheme: getCookie("mantine-color-scheme", appContext.ctx) || "dark",
    };
};
