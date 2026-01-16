const spacesPeru21 = [
    {
        'id': 'ads_top',
        'dimensions': [[728, 90], [970, 250], [900, 30], [970, 90], 'fluid'],
        'dimensions_mobile': [[320, 100], [300, 100], [300, 50], [320, 50], 'fluid'],
        'dispositivo': 'desktop,mobile',
        'web' : 'home,seccion,nota',
        'space': 'top',
        'ejecucion' : 'sra'
    }, {
        'id': 'ads_caja1',
        'dimensions': [[300, 250], [300, 600], [160, 600], [120, 600], 'fluid'],
        'dimensions_mobile': [[300, 250], [300, 600]],
        'dispositivo': 'desktop,mobile',
        'web' : 'home,seccion',
        'space': 'caja1',
        'ejecucion' : 'sra'
    }, {
        'id': 'ads_caja1',
        'dimensions': [[300, 250], [300, 600], [160, 600], [120, 600], 'fluid'],
        'dimensions_mobile': [],
        'dispositivo': 'desktop',
        'web' : 'nota',
        'space': 'caja1',
        'ejecucion' : 'sra'
    }, {
        'id': 'ads_zocalo',
        'dimensions': [[728, 90], [468, 60]],
        'dimensions_mobile': [[320, 180], [320, 110], [320, 50], 'fluid'],
        'dispositivo': 'desktop,mobile',
        'web' : 'home,seccion,nota',
        'space': 'zocalo',
        'ejecucion' : 'sra'
    }, {
        'id': 'ads_vslider',
        'dimensions': [1, 1],
        'dimensions_mobile': [1, 1],
        'dispositivo': 'desktop,mobile',
        'web' : 'home,seccion,nota',
        'space': 'vslider',
        'ejecucion' : 'sra'
    }, {
        'id': 'ads_inline',
        'dimensions': [[1, 1], [640, 360], [336, 280], [300, 250], [320, 240], [320, 50], 'fluid'],
        'dimensions_mobile': [[1, 1], [360, 480], [336, 280], [320, 240], [320, 180], [300, 250], [350, 250], 'fluid'],
        'dispositivo': 'desktop,mobile',
        'web' : 'home,nota',
        'space': 'inline',
        'ejecucion' : 'lazyload'
    }, {
        'id': 'ads_intext',
        'dimensions': [[1, 1], [640, 360], [336, 280], [300, 250], [320, 240], 'fluid'],
        'dimensions_mobile': [[1, 1], [360, 480], [336, 280], [320, 240], [320, 180], [300, 250], [350, 250], 'fluid'],
        'dispositivo': 'desktop,mobile',
        'web' : 'nota',
        'space': 'intext',
        'ejecucion' : 'lazyload'
    }, {
        'id': 'ads_caja2',
        'dimensions': [[300, 250], [300, 600], [160, 600], [120, 600], 'fluid'],
        'dimensions_mobile': [],
        'dispositivo': 'desktop',
        'web' : 'nota',
        'space': 'caja2',
        'ejecucion' : 'lazyload'
    }, {
        'id': 'ads_caja3',
        'dimensions': [],
        'dimensions_mobile': [[360, 480], [336, 280], [320, 240], [320, 180], [300, 250], [350, 250], [350, 250], 'fluid'],
        'dispositivo': 'mobile',
        'web' : 'nota',
        'space': 'caja3',
        'ejecucion' : 'lazyload'
    }, {
        'id': 'ads_caja4',
        'dimensions': [], 
        'dimensions_mobile': [[1, 1], [360, 480], [336, 280], [320, 240], [320, 180], [300, 250], [350, 250], [350, 250], 'fluid'],
        'dispositivo': 'mobile',
        'web' : 'nota',
        'space': 'caja4',
        'ejecucion' : 'lazyload'
    }, {
        'id': 'ads_caja5',
        'dimensions': [],
        'dimensions_mobile': [[1, 1], [360, 480], [336, 280], [320, 240], [320, 180], [300, 250], [350, 250], [350, 250], 'fluid'],
        'dispositivo': 'mobile',
        'web' : 'nota',
        'space': 'caja5',
        'ejecucion' : 'lazyload'
    },
]

window.spacesPeru21 = spacesPeru21

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
            nomSeccionVar = window.location.pathname.split('/')[1].replace(/-/, '');
        } else {
            nomSeccionVar = window.location.pathname.split('/')[1].replace(/-/, '');
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
            eTags = Array.from(document.querySelectorAll("meta[property='article:tag']"))
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

const newLazyLoad = (input) => {
    googletag.cmd.push(function () {
        const definedSlot = googletag.defineSlot(`${fuente}${input.space}`, input.dimensions, input.id).addService(googletag.pubads());
        googletag.pubads().enableLazyLoad({
            fetchMarginPercent: 100,
            renderMarginPercent: 100,
            mobileScaling: 2.0,
        });
        googletag.pubads().refresh([definedSlot]);
        console.log('lazyload ', input)
    });
}

// SRA
const adsCollectionSra = spacesPeru21.filter((input) => {
    const getSlot = document.getElementById(input.id);
    if(getSlot){
        if (input.dispositivo.includes(_device) && input.web.includes(_isTipoPagina) && input.ejecucion === 'sra'){
            if (_device === 'mobile') {
                input.dimensions = input.dimensions_mobile;
            }
            return input
        }
    } 
    return false
});

const adsCollectionLazyload = spacesPeru21.filter((input) => {
    const getSlot = document.getElementById(input.id);
    if(getSlot){
        if (input.dispositivo.includes(_device) && input.web.includes(_isTipoPagina) && input.ejecucion === 'lazyload'){
            if (_device === 'mobile') {
                input.dimensions = input.dimensions_mobile;
            }
            return input
        }
    } 
    return false
});

window.adsCollectionSra = adsCollectionSra
window.adsCollectionLazyload = adsCollectionLazyload; 

//SRA
googletag.cmd.push(() => {
    adsCollectionSra.forEach((input) => {
        let slot = null;
        if(input.id === 'ads_zocalo'){
            slot = googletag.defineOutOfPageSlot(`${fuente}${input.space}`, googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR)
            slot.setTargeting('test', 'anchor').addService(googletag.pubads())
        } else {
            slot = googletag.defineSlot(`${fuente}${input.space}`, input.dimensions, input.id).addService(googletag.pubads());
        }
    })
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
    googletag.pubads().refresh();
    console.log('sra ads')
})

// LAZYLOAD
const spacesCollection1 = adsCollectionLazyload.forEach(function(input) {
    const getSlot = document.getElementById(input.id);
    const gptDisplay = document.createElement('script');
    if(getSlot){
        gptDisplay.textContent = newLazyLoad(input)
        getSlot.append(gptDisplay);
        console.log(input)
    }
})

googletag.cmd.push(() => {
    googletag.pubads().setTargeting('seccion', _section);
    googletag.pubads().setTargeting('tags', _tags);
    googletag.pubads().setTargeting('tmp_ad', _tmpAd);

    googletag.pubads().addEventListener('impressionViewable', (event) => {
        const slot = event.slot;
        const slotID = slot.getSlotElementId();

        if(slotID === `gpt_unit_${fuente}zocalo_0` || slotID === 'ads_zocalo'){
            setTimeout(() => {
                googletag.pubads().refresh([slot])
            }, 30 * 1000)
            console.log(`refresh on ${slotID} (30 seg)`);
        }                
    });

    googletag.enableServices();
})

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