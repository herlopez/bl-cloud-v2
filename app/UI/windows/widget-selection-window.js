/**
 * Widget Selection Window.
 * @function WidgetSelectionWindow
 * @return {string}
 */
function WidgetSelectionWindow() {
    return `
        <div class="widget-selection">
            <h2 class="mb0">Add Widget</h2>
            <hr>
            <div class="c ac jc">
                <div class="r ac jc" style="flex-wrap: wrap; max-width: 1345px;"> 
                    <div class="c ac jc"> 
                        <button onclick="windowSwitcher('gauge')" class="bbutton"> 
                            <svg height="${200 * 0.7}" width="${200 * 0.7}">
                                <circle cx= "${100 * 0.7}" cy= "${100 * 0.7}" r="${5 * 0.7}" fill="#ffffff"/>
                                <path fill="#0D790A" d="M${29.29 * 0.7},${170.71 * 0.7}           A ${100 * 0.7} ${100 * 0.7} 0 0 1 ${0 * 0.7} ${102.5 * 0.7}                 L ${20 * 0.7} ${102.5 * 0.7}               A ${80 * 0.7} ${80 * 0.7} 0 0 0 ${43.432 * 0.7} ${156.568 * 0.7}"/>
                                <path fill="#0D790A" d="M${0 * 0.7},${97.5 * 0.7}                 A ${100 * 0.7} ${100 * 0.7} 0 0 1 ${27.592735 * 0.7} ${31.12827 * 0.7}      L ${41.6915 * 0.7} ${45.227 * 0.7}         A ${80 * 0.7} ${80 * 0.7} 0 0 0 ${20 * 0.7} ${97.5 * 0.7} "/>
                                <path fill="#F3B820" d="M${31.05709 * 0.7}, ${27.521555 * 0.7}    A ${100 * 0.7} ${100 * 0.7} 0 0 1 ${97.5 * 0.7} ${0 * 0.7}                  L ${97.5 * 0.7} ${20 * 0.7}                A ${80 * 0.7} ${80 * 0.7} 0 0 0 ${45.226855 * 0.7} ${41.6915 * 0.7}"/>
                                <path fill="#F3B820" d="M${102.5 * 0.7},${0 * 0.7}                A ${100 * 0.7} ${100 * 0.7} 0 0 1 ${168.94291 * 0.7} ${27.521555 * 0.7}     L ${154.773145 * 0.7} ${41.6915 * 0.7}     A ${80 * 0.7} ${80 * 0.7} 0 0 0 ${102.5 * 0.7} ${20 * 0.7}"/>
                                <path fill="#D20303" d="M${172.407265 * 0.7},${31.12827 * 0.7}    A ${100 * 0.7} ${100 * 0.7} 0 0 1 ${200 * 0.7} ${97.5 * 0.7}                L ${180 * 0.7} ${97.5 * 0.7}               A ${80 * 0.7} ${80 * 0.7} 0 0 0 ${158.3085 * 0.7} ${45.227 * 0.7}"/>
                                <path fill="#D20303" d="M${200 * 0.7},${102.5 * 0.7}              A ${100 * 0.7} ${100 * 0.7} 0 0 1 ${170.71 * 0.7} ${170.71 * 0.7}           L ${156.568 * 0.7} ${156.568 * 0.7}        A ${80 * 0.7} ${80 * 0.7} 0 0 0 ${180 * 0.7} ${102.5 * 0.7}"/>
                                <path style="transform-origin: ${100 * 0.7}px ${100 * 0.7}px;" fill="#707070" d="M${95 * 0.7},${110 * 0.7} L ${105 * 0.7} ${110 * 0.7} L ${102 * 0.7} ${95 * 0.7} L ${100 * 0.7} ${3 * 0.7} L ${98 * 0.7} ${95 * 0.7}"/>
                            </svg> 
                        </button> 
                        <h2>Gauge</h2> 
                    </div> 
                    <div class="c ac jc">
                        <button onclick = "windowSwitcher('data')" class="bbutton"><div class="c"><h3>Temperature</h3><h1>24</h1><p>2019-10-26 12:48:01</p></div></button>
                        <h2>Data Block</h2>
                    </div>
                    <div class="c ac jc">   
                        <button onclick = "windowSwitcher('line_graph')" class="bbutton"><div class="ct-chart-line-chart-widget"></div></button>
                        <h2>Line Graph</h2>
                    </div>
                    <div class="c ac jc">
                        <button onclick = "windowSwitcher('plot_graph')" class="bbutton"><div class="ct-chart-scatter-chart-widget"></div></button>
                        <h2>Scatter Plot</h2>
                    </div>
                </div>
                <div class="r">
                    <button onclick="windowSwitcher('none')">Cancel</button>
                </div>
            </div>
        </div>
    `;

}