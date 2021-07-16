import { useEffect, useState } from "react";
import packageJson from "../../package.json";

const CacheBusting = ({ isEnable = true }) => {
  const [cacheStatus, setCacheStatus] = useState({
    loading: true,
    isLatestVersion: false,
  });

  let version = packageJson.version;

  useEffect(() => {
    checkCatchStatus();
  }, []);

  const checkCatchStatus = async () => {
    try {
      console.log("executed");
      const currentVersion = packageJson.version;

      const response = await fetch("/meta.json");

      const { version: metaVersion } = await response.json();

      const shouldForceReload = checkVersion(metaVersion, currentVersion);

      if (shouldForceReload) {
        console.log(shouldForceReload);
        console.log(
          `We are having the new version ${metaVersion} Should need to force reload`
        );

        setCacheStatus({
          loading: false,
          isLatestVersion: false,
        });
      } else {
        console.log("You are with the latest version. No need to reload");

        setCacheStatus({
          loading: false,
          isLatestVersion: true,
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const refreshCacheAndReload = async () => {
    try {
      if (caches) {
        const cacheNames = await caches.keys();

        await Promise.all(cacheNames.map((name) => caches.delete(name)));

        console.log("The cache has been cleared");

        alert("not equal");

        //window.location.reload();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!cacheStatus.loading && !cacheStatus.isLatestVersion) {
    refreshCacheAndReload();
    return null;
  }

  const checkVersion = (metaVersion, currentVersion) => {
    // if (!currentVersion) {
    //   return false;
    // }

    // const metaVersions = metaVersion.split(/\./g);

    // const currentVersions = currentVersion.split(/\./g);

    //console.log(metaVersions, currentVersions);

    if (metaVersion === currentVersion) {
      return false;
    } else {
      return true;
    }

    // while (metaVersions.length || currentVersions.length) {
    //   const a = Number(metaVersions.shift());

    //   const b = Number(currentVersions.shift());
    //   if (a === b) {
    //     continue;
    //   }
    //   return a > b || isNaN(b);
    // }
    // return false;
  };

  return (
    <div>
      {!cacheStatus.loading && cacheStatus.isLatestVersion ? (
        <h2>CacheBusting v-{`${version}`}</h2>
      ) : null}
    </div>
  );
};

export default CacheBusting;
