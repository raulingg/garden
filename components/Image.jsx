const Image = ({ src, ...rest }) => {
  const responsiveImage = require(`../public${src}?resize`)
  const responsiveImageWebp = require(`../public${src}?resize&webp`)

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundImage: 'url("' + responsiveImage.placeholder + '")',
      }}>
      <picture>
        <img
          src={responsiveImage.src}
          srcSet={responsiveImage.srcSet}
          height="100%"
          width="100%"
          {...rest}
        />
      </picture>
    </div>
  )
}

export default Image
