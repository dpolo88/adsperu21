const spacesPeru21 = [
    {
        'id': 'ads_interstitial',
        'dispositivo': 'desktop,mobile',
        'web' : 'home,seccion,nota',
        'dimensions': [1, 1],
        'dimensions_mobile': [1, 1],
        'space': 'interstitial'
    }, {
        'id': 'ads_top',
        'dimensions': [728, 90],
        'dimensions_mobile': [320, 50],
        'dispositivo': 'desktop,mobile',
        'web' : 'home,seccion,nota',
        'space': 'top'
    }, {
        'id': 'ads_caja1',
        'dimensions': [[300, 250], [300, 600]],
        'dimensions_mobile': [[300, 250], [300, 600]],
        'dispositivo': 'desktop,mobile',
        'web' : 'home,seccion',
        'space': 'caja1'
    }, {
        'id': 'ads_caja1',
        'dimensions': [[300, 250], [300, 600]],
        'dimensions_mobile': [],
        'dispositivo': 'desktop',
        'web' : 'nota',
        'space': 'caja1'
    }, {
        'id': 'ads_laterall',
        'dimensions': [[160, 600], [120, 600]],
        'dimensions_mobile': [],
        'dispositivo': 'desktop',
        'web' : 'home,seccion,nota',
        'space': 'laterall'
    }, {
        'id': 'ads_lateralr',
        'dimensions': [[160, 600], [120, 600]],
        'dimensions_mobile': [],
        'dispositivo': 'desktop',
        'web' : 'home,seccion,nota',
        'space': 'lateralr'
    }, {
        'id': 'ads_zocalo',
        'dimensions': [728, 90],
        'dimensions_mobile': [320, 50],
        'dispositivo': 'desktop,mobile',
        'web' : 'home,seccion,nota',
        'space': 'zocalo'
    }, {
        'id': 'ads_vslider',
        'dimensions': [1, 1],
        'dimensions_mobile': [1, 1],
        'dispositivo': 'desktop,mobile',
        'web' : 'home,seccion,nota',
        'space': 'vslider'
    }, {
        'id': 'ads_inline',
        'dimensions': [1, 1],
        'dimensions_mobile': [],
        'dispositivo': 'desktop',
        'web' : 'nota',
        'space': 'inline'
    }, {
        'id': 'ads_caja3',
        'dimensions': [],
        'dimensions_mobile': [300, 250],
        'dispositivo': 'mobile',
        'web' : 'nota',
        'space': 'caja3'
    }, {
        'id': 'ads_caja4',
        'dimensions': [], 
        'dimensions_mobile': [300, 250],
        'dispositivo': 'mobile',
        'web' : 'nota',
        'space': 'caja4'
    }, {
        'id': 'ads_caja5',
        'dimensions': [],
        'dimensions_mobile': [300, 250],
        'dispositivo': 'mobile',
        'web' : 'nota',
        'space': 'caja5'
    },
]

const device = function () {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        // return 'tablet'; debe devolver tablet pero en pro debe ser mobile
        return 'mobile';
    }
    if (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
};

const pageType = class PageType {

    static removeAccents(str){
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    static BodyClass() {
        const objBody = document.querySelector('body');
        const classBody = objBody.getAttribute('class');
        return classBody;
    }

    static isPortada() {
        return this.BodyClass().search('path-frontpage') !== -1;
    }

    static isSeccion() {
        return this.BodyClass().search('path-taxonomy') !== -1;
    }

    static isNota() {
        return this.BodyClass().search('path-node') !== -1;
    }

    static nomSeccion() {
        let nomSeccionVar = '';
        if (this.isPortada()){
            nomSeccionVar = '';
        } else if(this.isNota()){
            const metatag = document.querySelector("meta[property='article:section']");
            if(metatag){
                const section = metatag.getAttribute('content') || 'default'
                nomSeccionVar = section;
            } else {
                nomSeccionVar = 'default'
            }
        } else {
            nomSeccionVar = window.location.pathname.split('/')[1].replace(/-/, '');
        }
        return nomSeccionVar.toLowerCase();
    }

    static tipoPagina() {
        let tipoPagina = '';
        if (this.isPortada()){
            tipoPagina = 'home';
        } else if(this.isNota()){
            tipoPagina = 'nota';
        } else {
            tipoPagina = 'seccion';
        }
        return tipoPagina;
    }
}

const _isTipoPagina = pageType.tipoPagina();
const _device = device();
const _section = pageType.nomSeccion();

const fuenteFunc = () => {
    const sect = (_isTipoPagina === 'nota') ? '_' : '';
    console.log(`/22946950648/peru21_${_isTipoPagina}${sect}${_section}_` )
    return `/22946950648/peru21_${_isTipoPagina}${sect}${_section}_` 
}

const s = `https://d1r08wok4169a5.cloudfront.net/gpt-adtmp/ads-formats-v2/public/css/ads-styles-${_device}.css`
const _head = document.getElementsByTagName('head')[0]
const _link = document.createElement('link')
_link.rel = 'stylesheet'
_link.type = 'text/css'
_link.href = s
_head.appendChild(_link)

const fuente = fuenteFunc();

window.googletag = window.googletag || {cmd: []};
window.Slot = null;

googletag.cmd.push(function() {
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
});


/*
    googletag.cmd.push(() => {
        googletag.pubads().setTargeting('categoria', _target.categoria);
        googletag.pubads().setTargeting('contenido', _target.contenido);
        googletag.pubads().setTargeting('fuente', _target.fuente);
        googletag.pubads().setTargeting('paywall', _target.paywall);
        googletag.pubads().setTargeting('phatname', _target.phatname);
        googletag.pubads().setTargeting('publisher', _target.publisher);
        googletag.pubads().setTargeting('seccion', _target.seccion);
        googletag.pubads().setTargeting('tags', _target.tags);
        googletag.pubads().setTargeting('tipoplantilla', _target.tipoplantilla);
        googletag.pubads().setTargeting('tmp_ad', _target.tmp_ad);
        if(isMinutoaMinuto){
            googletag.pubads().setTargeting('tipoplantillanota', 'mam');
        }
        googletag.pubads().addEventListener('impressionViewable', (event) => {
            const slot = event.slot;
            const slotID = slot.getSlotElementId();
            if(slotID === 'ads_zocalo' || slotID === 'ads_caja1' || slotID === 'ads_caja2' || slotID === 'ads_caja3'){
                setTimeout(() => {
                    googletag.pubads().refresh([slot])
                }, 30 * 1000)
            }
        });
        googletag.enableServices();
    })
*/
   
const newLazyLoad = (input) => {
    googletag.cmd.push(function () {
        const definedSlot = googletag.defineSlot(`${fuente}${input.space}`, input.dimensions, input.id).addService(googletag.pubads());
            googletag.pubads().enableLazyLoad({
                fetchMarginPercent: 100,
                renderMarginPercent: 100,
                mobileScaling: 2.0,
            });
            googletag.pubads().refresh([definedSlot]);
    });
}

const spacesCollection = spacesPeru21.filter(function(input) {
    const getSlot = document.getElementById(input.id);
    const gptDisplay = document.createElement('script');
    if(getSlot){
        if (input.dispositivo.indexOf(_device) !== -1 && input.web.indexOf(_isTipoPagina) !== -1){
            if (_device === 'mobile') {
                input.dimensions = input.dimensions_mobile;
            }
            gptDisplay.textContent = newLazyLoad(input)
            getSlot.append(gptDisplay);
        }
    }
    return false
}) || []
window.spacesCollection = spacesCollection;

    