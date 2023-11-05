---

---
# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased version bump 0.3.0] - 2023-11-04

Substantial revamp of PreviewSubscription as promised, to provide framework for specfying and potentially using preview-kit's many options, beginning with perspectives. 

A Provider is natural, among simpliying and Reactish styles, and TypeScript as applied moves towards releasable territory.

There's a simple breaking change, which you'll naturally fit as you move your client config to the standard-fashion `previewConfig.ts` in the app's top folder, and put your preview-kit config accordingly in this also. Only the primary item, the `previewDrafts` perspective is needed. 

Also pay attention to the props on `<PreviewSubscription />` in the app, as they've altered, simplifying and using the kitConfig you'll just have added as import.

### Next 
...will be planned work on libraries, which were just borrowed from other projects for speed in prototyping and discovery. The app will continue to work fine as at present, but things can definitely be nicer.

### Added
- previewConfig.ts

### Changed
- sanity-astro-preview substantially modified, mainly in `PreviewSubscription.tsx` and the types and interfaces the package exports

### Fixed
- invisibly, previewDrafts hadn't been operating, though previews did. Now we're atteneding to perspectives, this one to begin.
