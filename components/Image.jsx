const Image = ({ src, ...rest }) => {
  const responsiveImage = require(`../public${src}?resize`)
  const responsiveImageWebp = require(`../public${src}?resize&webp`)

  return (
    <div
      style={{
        width: "100%",
        backgroundSize: "cover",
        backgroundImage: 'url("' + responsiveImage.placeholder + '")',
      }}>
      <picture>
        <img
          src={responsiveImage.src}
          srcSet={responsiveImage.srcSet}
          width={"100%"}
          {...rest}
        />
      </picture>
    </div>
  )
}

export default Image
