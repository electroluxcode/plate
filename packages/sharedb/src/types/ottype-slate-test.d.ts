declare module 'ottype-slate-test' {
  interface OtType {
    type: {
      name: string;
      create: () => any;
      apply: (snapshot: any, op: any) => any;
      compose: (op1: any, op2: any) => any;
      transform: (op1: any, op2: any, side: 'left' | 'right') => any;
      invert: (op: any) => any;
      normalize: (op: any) => any;
    };
  }

  const ottype: OtType;
  export = ottype;
} 