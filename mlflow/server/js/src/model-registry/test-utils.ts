export const mockRegisteredModelDetailed = (
  name: any,
  latestVersions = [],
  tags = [],
  _unused1 = '',
  _unused2 = 0,
) => {
  return {
    creation_timestamp: 1571344731467,
    last_updated_timestamp: 1573581360069,
    latest_versions: latestVersions,
    name,
    tags,
  };
};

export const mockModelVersionDetailed = (
  name: any,
  version: any,
  stage: any,
  status: any,
  tags = [],
  run_link = undefined,
  run_id = 'b99a0fc567ae4d32994392c800c0b6ce',
  user_id = 'richard@example.com',
) => {
  return {
    name,
    // Use version-based timestamp to make creation_timestamp differ across model versions
    // and prevent React duplicate key warning.
    creation_timestamp: version.toString(),
    last_updated_timestamp: (version + 1).toString(),
    user_id: user_id,
    current_stage: stage,
    description: '',
    source: 'path/to/model',
    run_id: run_id,
    run_link: run_link,
    status,
    version,
    tags,
  };
};

export const mockGetFieldValue = (comment: any, archive: any) => {
  return (key: any) => {
    if (key === 'comment') {
      return comment;
    } else if (key === 'archiveExistingVersions') {
      return archive;
    }
    throw new Error('Missing mockGetFieldValue key');
  };
};
