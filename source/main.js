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
        'dimensions_mobile': [1, 1],
        'dispositivo': 'desktop,mobile',
        'web' : 'nota',
        'space': 'inline'
    }, {
        'id': 'ads_caja2',
        'dimensions': [[300, 250], [300, 600]],
        'dimensions_mobile': [],
        'dispositivo': 'desktop',
        'web' : 'nota',
        'space': 'caja2'
    }, {
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
        return this.BodyClass().search('home') !== -1;
    }

    static isSeccion() {
        return this.BodyClass().search('category') !== -1;
    }

    static isNota() {
        return this.BodyClass().search('post-template-default') !== -1;
    }

    static nomSeccion() {
        let nomSeccionVar = '';
        if (this.isPortada()){
            nomSeccionVar = '';
        } else if(this.isNota()){
            const metatag = document.querySelector("meta[property='category']");
            if(metatag){
                const section = metatag.getAttribute('content') || 'default'
                nomSeccionVar = section.replace(/\s/g, '');
            } else {
                nomSeccionVar = 'default'
            }
        } else {
            nomSeccionVar = window.location.pathname.split('/')[2].replace(/-/, '');
        }
        return this.removeAccents(nomSeccionVar.toLowerCase());
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

    static tags() {
        let nomTags = '';
        const eTagsValues = []
        let eTags = []
        if (this.isPortada()){
            nomTags = 'home';
        } else if(this.isNota()){
            eTags = Array.from(document.querySelectorAll("meta[property='tag']"))
            eTags.forEach(function(element) {
                if(element.content){
                    eTagsValues.push(element.content);
               }
            });
            nomTags = eTagsValues.join().toLowerCase().replace(/ /g, '')
        } else {
            nomTags = 'seccion';
        }
        console.log(nomTags)
        return nomTags;
    }

    static getTmpAd () {
        const tmpAdTargeting = window.location.search.match(/tmp_ad=([^&]*)/) || [];
        return tmpAdTargeting[1] || ''
    }
}

const _isTipoPagina = pageType.tipoPagina();
const _device = device();
const _section = pageType.nomSeccion();
const _tags = pageType.tags();
const _tmpAd = pageType.getTmpAd();

window._isTipoPagina = _isTipoPagina;
window._device = _device;
window._section = _section;

const fuenteFunc = () => {
    const sect = (_isTipoPagina === 'nota' || _isTipoPagina === 'seccion') ? '_' : '';
    return `/22946950648/peru21_${_isTipoPagina}${sect}${_section}_` 
}

const fuente = fuenteFunc();

window.googletag = window.googletag || {cmd: []};
window.Slot = null;

googletag.cmd.push(function() {
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();

    const screenWidth = window.innerWidth;
    const script = document.createElement(
    'script');
    script.async = true;
    script.src = screenWidth < 800 ?
    'https://stpd.cloud/saas/8810' :
    'https://stpd.cloud/saas/8809';
    document.head.appendChild(script);

});

googletag.cmd.push(() => {
    googletag.pubads().setTargeting('seccion', _section);
    googletag.pubads().setTargeting('tags', _tags);
    googletag.pubads().setTargeting('tmp_ad', _tmpAd);
    googletag.enableServices();
})

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

window.spacesCollection = []; 
const spacesCollection1 = spacesPeru21.filter(function(input) {
    const getSlot = document.getElementById(input.id);
    const gptDisplay = document.createElement('script');
    if(getSlot){
        if (input.dispositivo.includes(_device) && input.web.includes(_isTipoPagina)){
            if (_device === 'mobile') {
                input.dimensions = input.dimensions_mobile;
            }
            window.spacesCollection.push(input)
            gptDisplay.textContent = newLazyLoad(input)
            getSlot.append(gptDisplay);
        }
    }
    return false
}) || []
window.spacesCollection = spacesCollection1; 

let adItt = true

const funcItt = function () {
    adItt = false

    window.googletag = window.googletag || { cmd: [] }

    googletag.cmd.push(function () {
        const interstitialSlot = googletag.defineOutOfPageSlot(
                `${fuente}interstitial`,
                googletag.enums.OutOfPageFormat.INTERSTITIAL
            )

            if (interstitialSlot) {
                interstitialSlot.addService(googletag.pubads())
            }

            googletag.enableServices()
            googletag.display(interstitialSlot)
    })
}

if(adItt){
    funcItt()
}