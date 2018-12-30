const { Sizer } = require('src/core/utils');
const { Color } = require('src/res/Color');

export const Font = {
  header: {
    fontSize: Sizer.fontSizer(30),
    fontWeight: '700',
    color: Color.text,
    backgroundColor: 'transparent',
  },
  subHeader: {
    fontSize: Sizer.fontSizer(22),
    fontWeight: '500',
    color: Color.text,
    backgroundColor: 'transparent',
  },
  body: {
    fontSize: Sizer.fontSizer(18),
    color: Color.text,
    backgroundColor: 'transparent',
  },
  helper: {
    fontSize: Sizer.fontSizer(16),
    color: Color.text,
    backgroundColor: 'transparent',
  },
}
