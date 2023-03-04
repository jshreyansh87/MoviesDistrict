const uiConfigs = {
    style: {
        gradientBgImage: {
            dark: {
                backgroundImage: "linear-gradient(to, top, rbga(0,0,0,1), rgba(0,0,0,0))"
            },
            light: {
                backgroundImage: "linear-gradient(to, top, rbga(245,245,245,1), rgba(0,0,0,0))"
            }
        },
        horizontalGradientBgImage: {
            dark: {
                backgroundImage: "linear-gradient(to, right, rbga(0,0,0,1), rgba(0,0,0,0))"
            },
            light: {
                backgroundImage: "linear-gradient(to, right, rbga(245,245,245,1), rgba(0,0,0,0))"
            }
        },
        typoLines: (lines, textAlign) => ({
            textAlign: textAlign || "justfy",
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: lines
        }),
        mainContent: {
            maxWidth: "1366px",
            margin: "auto",
            padding: 2
        },
        backgroundImage: (imgPath) => ({
            position: "relative",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "darkgrey",
            backgroundImage: `url(${imgPath})`
        }),
        size:{
            sidebarWith: "300px",
            contentMaxWidth: "1366px"
        }
    }
};

export default uiConfigs;
