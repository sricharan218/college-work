# Conflict analysis and resolution

Two developers edited the same release-status line on separate branches. Git
reported a content conflict and stopped the merge. The integration lead inspected
the two versions, combined both valid updates, removed conflict markers, staged
the resolved file and committed the merge. The final release note retains the
authentication/catalogue update and the checkout/orders update.
