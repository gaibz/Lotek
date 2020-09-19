import { Options as HTMLMinifierOptions } from "html-minifier";
import { Options as CleanCSSOptions } from "clean-css";
import { CompressOptions } from "terser";

type Group = {
  name?: string;
  debug_mode?: boolean;

  /**
   * @description configuration for JS file
   */
  js?: {
    files?: string[];
    output?: string;
    use_closure_per_file?: boolean;
    use_closure_all?: boolean;
    minify?: boolean;
    minify_options?: CompressOptions;
    [k: string]: any;
  };

  /**
   * @description configuration for css file
   */
  css?: {
    files?: string[];
    output?: string;
    url_replaces?: {
      find: string;
      replacement: string;
    }[];
    replace_log_output?: string;
    minify?: boolean;
    minify_options?: CleanCSSOptions;
    [k: string]: any;
  };

  /**
   * @description configuration for HTML file
   */
  html?: {
    files?: string[];
    output?: string;
    replaces?: {
      find: string;
      replacement: string;
    }[];
    minify?: boolean;
    minify_options?: HTMLMinifierOptions;
    [k: string]: any;
  };
  [k: string]: any;
};

type LotekConfig = {
  groups: Group[];
  [k: string]: any;
};

declare class Lotek {
  constructor(config: LotekConfig);
  compile(): Promise<unknown>;
}

export = Lotek;
