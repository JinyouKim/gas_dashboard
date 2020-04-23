import palette from './palette'
import { isPlaceholderType, tsStringKeyword } from '@babel/types';

export default {
    fontFamily: ['NanumGothic', 'NanumGothicB'],
    h1_title: {
        fontFamily: 'NanumGothicB',
        color: palette.text.widgetHeader,
        //fontWeight: 'bold',
        fontSize: '20px',
        letterSpacing: '0.5px',
        lineHeight: '20px'
    },
    h1_sub1: {
        fontFamily: 'NanumGothicB',
        fontWeight: 'bold',
        fontSize: '15px',
        letterSpacing: '0.5px',
        lineHeight: '12px'
    },
    // selection 제목 
    h3: {
        fontFamily: 'NanumGothicB',
        color: "#f5f8fa",
        fontSize: '16px',
    },
    h4: {
        color: "f5f8fa",
        fontWeight: 'bold',
        fontSize: '20px',
        letterSpacing: '-0.06px',
        lineHeight: '24px'
    },
    h5: {
        color: "white",
        fontWeight: 500,
        fontSize: '16px',
        letterSpacing: '-0.05px',
        lineHeight: '20px'
    },
    h6: {
        color: palette.text.primary,
        fontWeight: 500,
        fontSize: '14px',
        letterSpacing: '-0.05px',
        lineHeight: '20px'
    },
    subtitle1: {
        color: palette.text.primary,
        fontSize: '16px',
        letterSpacing: '-0.05px',
        lineHeight: '25px'
    },
    subtitle2: {
        color: palette.text.secondary,
        fontWeight: 400,
        fontSize: '14px',
        letterSpacing: '-0.05px',
        lineHeight: '21px'
    },
    body1: {
        color: palette.text.primary,
        fontFamily: 'NanumGothic',
        fontSize: '16px',
        fontWeight: 'regular',
        letterSpacing: '-0.05px',
        lineHeight: '21px'
    },
    body2: {
        color: palette.text.secondary,
        fontSize: '10px',
        fontWeight: 'regular',
        letterSpacing: '-0.04px',
        lineHeight: '18px'
    },
    button: {
        color: palette.text.primary,
        fontSize: '14px'
    },
    caption: {
        color: palette.text.secondary,
        fontSize: '11px',
        letterSpacing: '0.33px',
        lineHeight: '13px'
    },
    overline: {
        color: palette.text.secondary,
        fontWeight: 500,
        fontSize: '11px',
        letterSpacing: '0.35px',
        lineHeight: '13px',
        textTransform: 'uppercase'
    },
    tableHeader: {
        color: palette.text.tableHeader,
        fontFamily: 'NanumGothicB',
        fontSize: '12px',
        lineHeight: '15px'
    },
    tableCell: {
        color: palette.text.tableCell,
        fontSize: '12px',
        lineHeight: '15px'        
    },
    buttonText: {
        fontFamily: 'NanumGothicB',
        fontSize: '14px',
        letterSpacing: '0.5px',
        color: '#f5f8fa'
    },
    selectionTitle: {

    }
};