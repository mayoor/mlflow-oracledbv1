export const modelListPageRoute = '/models';
export const modelPageRoute = '/models/:modelName';
export const modelSubpageRoute = '/models/:modelName/:subpage';
export const modelSubpageRouteWithName = '/models/:modelName/:subpage/:name';
export const modelVersionPageRoute = '/models/:modelName/versions/:version';
export const compareModelVersionsPageRoute = '/compare-model-versions';
export const getModelPageRoute = (modelName: any) => `/models/${encodeURIComponent(modelName)}`;
export const getModelVersionPageRoute = (modelName: any, version: any) =>
  `/models/${encodeURIComponent(modelName)}/versions/${version}`;
// replace undefined values with null, since undefined is not a valid JSON value
export const getCompareModelVersionsPageRoute = (modelName: any, runsToVersions: any) =>
  `/compare-model-versions?name=${JSON.stringify(encodeURIComponent(modelName))}` +
  `&runs=${JSON.stringify(runsToVersions, (k, v) => (v === undefined ? null : v))}`;
export const PANES = Object.freeze({
  DETAILS: 'details',
  SERVING: 'serving',
});
