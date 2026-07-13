export const shikiDark2026 = {
  name: 'dark-2026',
  type: 'dark',
  colors: {
    'editor.background': '#121314',
    'editor.foreground': '#BBBEBF',
  },
  tokenColors: [
    {
      settings: {
        foreground: '#BBBEBF',
        background: '#121314',
      },
    },
    {
      scope: ['meta.embedded', 'source.groovy.embedded', 'string meta.image.inline.markdown', 'variable.legacy.builtin.python'],
      settings: {
        foreground: '#BBBEBF',
      },
    },
    {
      scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
      settings: {
        foreground: '#8b949e',
      },
    },
    {
      scope: ['constant.numeric', 'keyword.operator.plus.exponent', 'keyword.operator.minus.exponent'],
      settings: {
        foreground: '#b5cea8',
      },
    },
    {
      scope: 'constant.regexp',
      settings: {
        foreground: '#646695',
      },
    },
    {
      scope: ['constant.other.placeholder', 'constant.character'],
      settings: {
        foreground: '#ff7b72',
      },
    },
    {
      scope: ['constant', 'entity.name.constant', 'variable.other.constant', 'variable.other.enummember', 'variable.language', 'entity'],
      settings: {
        foreground: '#79c0ff',
      },
    },
    {
      scope: ['entity.name', 'meta.export.default', 'meta.definition.variable'],
      settings: {
        foreground: '#ffa657',
      },
    },
    {
      scope: ['variable.parameter.function', 'meta.jsx.children', 'meta.block', 'meta.tag.attributes', 'meta.object.member', 'meta.embedded.expression'],
      settings: {
        foreground: '#c9d1d9',
      },
    },
    {
      scope: 'entity.name.function',
      settings: {
        foreground: '#d2a8ff',
      },
    },
    {
      scope: ['entity.name.tag', 'support.class.component'],
      settings: {
        foreground: '#7ee787',
      },
    },
    {
      scope: ['punctuation.definition.tag', 'punctuation.definition.tag.begin', 'punctuation.definition.tag.end'],
      settings: {
        foreground: '#808080',
      },
    },
    {
      scope: 'entity.other.attribute-name',
      settings: {
        foreground: '#9cdcfe',
      },
    },
    {
      scope: 'keyword',
      settings: {
        foreground: '#ff7b72',
      },
    },
    {
      scope: ['storage', 'storage.type'],
      settings: {
        foreground: '#ff7b72',
      },
    },
    {
      scope: ['storage.modifier.package', 'storage.modifier.import', 'storage.type.java'],
      settings: {
        foreground: '#c9d1d9',
      },
    },
    {
      scope: 'keyword.operator',
      settings: {
        foreground: '#bbbebf',
      },
    },
    {
      scope: ['keyword.operator.new', 'keyword.operator.expression', 'keyword.operator.cast', 'keyword.operator.sizeof', 'keyword.operator.alignof', 'keyword.operator.typeid', 'keyword.operator.alignas', 'keyword.operator.instanceof', 'keyword.operator.logical.python', 'keyword.operator.wordlike'],
      settings: {
        foreground: '#ff7b72',
      },
    },
    {
      scope: ['string', 'string punctuation.section.embedded source'],
      settings: {
        foreground: '#a5d6ff',
      },
    },
    {
      scope: 'support',
      settings: {
        foreground: '#79c0ff',
      },
    },
    {
      scope: 'meta.property-name',
      settings: {
        foreground: '#79c0ff',
      },
    },
    {
      scope: 'variable',
      settings: {
        foreground: '#ffa657',
      },
    },
    {
      scope: 'variable.other',
      settings: {
        foreground: '#c9d1d9',
      },
    },
    {
      scope: ['source.regexp', 'string.regexp'],
      settings: {
        foreground: '#a5d6ff',
      },
    },
    {
      scope: 'string.regexp constant.character.escape',
      settings: {
        foreground: '#7ee787',
        fontStyle: 'bold',
      },
    },
    {
      scope: ['support.constant', 'support.variable', 'meta.module-reference'],
      settings: {
        foreground: '#79c0ff',
      },
    },
    {
      scope: 'support.type.property-name.json',
      settings: {
        foreground: '#7ee787',
      },
    },
    {
      scope: ['punctuation.section.embedded'],
      settings: {
        foreground: '#ff7b72',
      },
    },
    {
      scope: ['markup.deleted', 'meta.diff.header.from-file', 'punctuation.definition.deleted'],
      settings: {
        foreground: '#ffa198',
        background: '#490202',
      },
    },
    {
      scope: ['markup.inserted', 'meta.diff.header.to-file', 'punctuation.definition.inserted'],
      settings: {
        foreground: '#7ee787',
        background: '#04260f',
      },
    },
    {
      scope: ['markup.changed', 'punctuation.definition.changed'],
      settings: {
        foreground: '#ffa657',
        background: '#5a1e02',
      },
    },
  ],
} as const;
