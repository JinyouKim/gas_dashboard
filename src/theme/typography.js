import palette from './palette'
import { isPlaceholderType, tsStringKeyword } from '@babel/types';

export default {
    fontFamily: ['NanumGothic', 'NanumGothicB'],
    h1_title: {
        fontFamily: 'NanumGothicB',
        color: palette.text.widgetHeader,
        //fontWeight: 'bold',
        fontSize: '15px',
        letterSpacing: '0.5px',
        lineHeight: '12px'
    },
    h1_sub1: {
        color: 'NanumGothicB',
        fontWeight: 'bold',
        fontSize: '15px',
        letterSpacing: '0.5px',
        lineHeight: '12px'
    },
    h3: {
        color: palette.text.primary,
        fontWeight: 'bold',
        fontSize: '24px',
        letterSpacing: '-0.06px',
        lineHeight: '28px'
    },
    h4: {
        color: palette.text.primary,
        fontWeight: 'bold',
        fontSize: '20px',
        letterSpacing: '-0.06px',
        lineHeight: '24px'
    },
    h5: {
        color: palette.text.primary,
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
        fontSize: '12px',
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
    }
};