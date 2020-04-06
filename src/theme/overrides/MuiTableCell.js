import palette from '../palette';
import typography from '../typography';

export default {
  root: {
    ...typography.tableCell,
    height:'32px',
    borderBottom: `1px solid ${palette.divider}`,
    padding: '6px',
    borderBottomColor: palette.divider
  },
  stickyHeader: {
    backgroundColor: palette.background.tableHeader,
    borderBottom: '0px',
    ...typography.tableHeader,
    height:'45px',    
    padding: '14px'
  }
};
