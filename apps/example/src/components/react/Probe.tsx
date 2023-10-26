export default function Probe (props) {
  console.log('probe props: ' + JSON.stringify(props))
  const { val = 'unset' } = props
  return (
    <>
      <h2>This is a probe, {val}</h2>
    </>
  )
}