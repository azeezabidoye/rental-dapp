module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("Rental", {
    contract: "Rental",
    from: deployer,
    args: [],
    log: true,
  });
};
module.exports.tags = ["Rental"];
