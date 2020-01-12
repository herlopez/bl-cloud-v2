function windowWidgetSelection(content) {
    content.classList.add('widget-selection');
    let mod = 0.7;
    content.innerHTML = `
        <h2 class="mb0">Add Widget</h2>
        <hr>
        <div class="c ac jc">
            <div class="r ac jc" style="flex-wrap: wrap; max-width: 1345px;"> 
                <div class="c ac jc"> 
                    <button onclick="windowSwitcher('gauge')" class="bbutton"> 
                        <svg height="${200 * mod}" width="${200 * mod}">
                            <circle cx= "${100 * mod}" cy= "${100 * mod}" r="${5 * mod}" fill="#ffffff"/>
                            <path fill="#0D790A" d="M${29.29 * mod},${170.71 * mod}           A ${100 * mod} ${100 * mod} 0 0 1 ${0 * mod} ${102.5 * mod}                 L ${20 * mod} ${102.5 * mod}               A ${80 * mod} ${80 * mod} 0 0 0 ${43.432 * mod} ${156.568 * mod}"/>
                            <path fill="#0D790A" d="M${0 * mod},${97.5 * mod}                 A ${100 * mod} ${100 * mod} 0 0 1 ${27.592735 * mod} ${31.12827 * mod}      L ${41.6915 * mod} ${45.227 * mod}         A ${80 * mod} ${80 * mod} 0 0 0 ${20 * mod} ${97.5 * mod} "/>
                            <path fill="#F3B820" d="M${31.05709 * mod}, ${27.521555 * mod}    A ${100 * mod} ${100 * mod} 0 0 1 ${97.5 * mod} ${0 * mod}                  L ${97.5 * mod} ${20 * mod}                A ${80 * mod} ${80 * mod} 0 0 0 ${45.226855 * mod} ${41.6915 * mod}"/>
                            <path fill="#F3B820" d="M${102.5 * mod},${0 * mod}                A ${100 * mod} ${100 * mod} 0 0 1 ${168.94291 * mod} ${27.521555 * mod}     L ${154.773145 * mod} ${41.6915 * mod}     A ${80 * mod} ${80 * mod} 0 0 0 ${102.5 * mod} ${20 * mod}"/>
                            <path fill="#D20303" d="M${172.407265 * mod},${31.12827 * mod}    A ${100 * mod} ${100 * mod} 0 0 1 ${200 * mod} ${97.5 * mod}                L ${180 * mod} ${97.5 * mod}               A ${80 * mod} ${80 * mod} 0 0 0 ${158.3085 * mod} ${45.227 * mod}"/>
                            <path fill="#D20303" d="M${200 * mod},${102.5 * mod}              A ${100 * mod} ${100 * mod} 0 0 1 ${170.71 * mod} ${170.71 * mod}           L ${156.568 * mod} ${156.568 * mod}        A ${80 * mod} ${80 * mod} 0 0 0 ${180 * mod} ${102.5 * mod}"/>
                            <path style="transform-origin: ${100 * mod}px ${100 * mod}px;" fill="#707070" d="M${95 * mod},${110 * mod} L ${105 * mod} ${110 * mod} L ${102 * mod} ${95 * mod} L ${100 * mod} ${3 * mod} L ${98 * mod} ${95 * mod}"/>
                        </svg> 
                    </button> 
                    <h2>Gauge</h2> 
                </div> 
                <div class="c ac jc">
                    <button onclick = "windowSwitcher('data')" class="bbutton"><div class="c"><h3>Temperature</h3><h1>24</h1><p>2019-10-26 12:48:01</p></div></button>
                    <h2>Data Block</h2>
                </div>
<!--                    <div class="c ac jc">-->
<!--                        <button class="bbutton"><input class="slider" type="range"></button>-->
<!--                        <h2>Slider</h2>-->
<!--                    </div>-->
<!--                    <div class="c ac jc">-->
<!--                        <button class="bbutton"><div class="ct-chart-pie-widget"></div></button>-->
<!--                        <h2>Pie Chart</h2>-->
<!--                    </div>-->
                <div class="c ac jc">   
                    <button onclick = "windowSwitcher('line_graph')" class="bbutton"><div class="ct-chart-line-chart-widget"></div></button>
                    <h2>Line Graph</h2>
                </div>
                <div class="c ac jc">
                    <button onclick = "windowSwitcher('plot_graph')" class="bbutton"><div class="ct-chart-scatter-chart-widget"></div></button>
                    <h2>Scatter Plot</h2>
                </div>
<!--                    <div class="c ac jc">-->
<!--                        <button class="bbutton"><div class="mr3 ct-chart-histo-chart-widget"></div></button>-->
<!--                        <h2>Bar Graph</h2>-->
<!--                    </div>-->
<!--                    <div class="c ac jc">-->
<!--                        <button class="bbutton"></button>-->
<!--                        <h2>Raw Data</h2>-->
<!--                    </div>-->
            </div>
            <div class="r">
                <button onclick="windowSwitcher('none')">Cancel</button>
            </div>
        </div>`;

    return content;
}